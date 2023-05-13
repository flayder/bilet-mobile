import React, {useEffect, useLayoutEffect, useRef, useState } from "react"
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera, CameraType, FlashMode } from 'expo-camera';
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Platform } from "react-native"
import {createStackNavigator } from '@react-navigation/stack'
import {LinkTo, emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { AppButton } from "../ui/AppButton";
import { Path, Svg } from "react-native-svg"
import { useDispatch, useSelector } from "react-redux"
import { BiletClass } from "../BiletClass"
import { getCurrentUser } from "../store/actions/user"
import { AppTextBold } from "../ui/AppTextBold"
import { checkBilet } from "../store/actions/bilet"

const ItemWrapper = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                height: 50,
                ...emptyNavigation
            }
        }, [navigation])
    })

    const init = true
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [bilet, setBilet] = useState(false)
    const [timer, setTimer] = useState(3)
    const [torch, setTorch] = useState(false)
    const cam = route.params && typeof route.params == "object" ? route.params.hash : false

    const checkedBilet = useSelector(state => state.bilet.scanned_checkout)
    const dispatch = useDispatch()
    let color = THEME.GREY
    let colorTimer = THEME.RED

    if(scanned && bilet && typeof bilet == "object") {
        if(bilet.results) {
            color = THEME.GREEN
        } else {
            color = THEME.RED
            colorTimer = "white"
        }
    }

    let windowSize = Dimensions.get('screen').width - 100

    useEffect(() => {
        dispatch(getCurrentUser({navigation}))
    }, [init])

    useEffect(() => {
        setHasPermission(null)
        const getBarCodeScannerPermissions = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync()
          setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions()

      
    }, [cam]);

    const handleBarCodeScanned = ({ type, data }) => {
      if(!scanned) {
        BiletClass.checkBilet(data).then(bilet => {
        //   console.log('datadd', data)
        //   console.log('bilet.product.id', bilet.product)
          setBilet(bilet)

          //console.log('bbbbbbbbbbbb', bilet)
          
          if(
            typeof bilet == "object" &&
            typeof bilet.product == "object" &&
            bilet.product.id > 0
          ) {
            if(
                (
                    typeof checkedBilet == "object" && 
                    typeof checkedBilet.product == "object" &&
                    checkedBilet.product.id > 0 &&
                    bilet.product.id != checkedBilet.product.id
                )
                ||
                typeof checkedBilet != "object"
                ||
                typeof checkedBilet == "object" &&
                !checkedBilet.hasOwnProperty('product')
            ) {
                dispatch(checkBilet(bilet))
            }
                
          }

          setTimeout(() => {
            setScanned(false)
            setBilet(false)
            //LinkTo('MainPageScreen', navigation)
          }, 3000);
        //   let timer = 3

        //   let time = setInterval(() => {
        //     setTimer(timer)
        //     //console.log('timer', timer)
        //     if(timer == 0) {
        //       clearInterval(time)
              
        //       setScanned(false)
        //       setBilet(false)
        //     }
        //     timer--
        //   }, 1000)
        })
        setScanned(true)
      }
        
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    }

    const infoRender = () => {
        if(scanned && bilet && bilet.results) {
            return <View style={styles.textBlock}>
                <AppTextBold style={styles.user}>
                    Приветствую, {BiletClass.getUserName(bilet.user)}
                </AppTextBold>
                {
                    bilet.place && <>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Ряд</AppText>
                            <AppText style={styles.text}>{bilet.place.row}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Место</AppText>
                            <AppText style={styles.text}>{bilet.place.name}</AppText>
                        </View>
                    </>
                }
                {
                    bilet.category && <>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Категория</AppText>
                            <AppText style={styles.text}>{bilet.category.name}</AppText>
                        </View>
                    </>
                }
            </View>
        }

        return <></>
    }

    const timerFun = () => {
        if(scanned && timer > 0) {
            return <View style={styles.timer}>
                <View style={styles.timerText}>
                    <AppText style={styles.timerTextTitle}>ОКНО ЗАКРОЕТСЯ ЧЕРЕЗ</AppText>
                    <AppText style={{...styles.timerTextNum, color: colorTimer}}>{timer}</AppText>
                </View>
            </View>
        }

        return <></>
    }

    const errorBlock = () => {
        if(scanned && bilet && typeof bilet == "object" && !bilet.results && bilet.error) {
            return <View style={styles.bottom}>
                <AppTextBold style={styles.textError}>{bilet.error}</AppTextBold>
            </View>
        }

        return <></>
    }

    if (hasPermission === null) {
      return <AppText style={styles.errorText}>Запрос на использование камеры</AppText>;
    }
    if (hasPermission === false) {
      return <AppText style={styles.errorText}>Нет доступов к камере</AppText>;
    }

    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0, backgroundColor: color}} measure={true}>
            <TouchableOpacity style={styles.back} onPress={() => {
                //handleBarCodeScanned({type: 'type', data: 'ec7f7e9d0db5cd43b08e4a4bbea712a0517c4c6e738fff8472442511bced59fb9107c7a7bf9c33276053ab41b220ab3224fcd82270dd9bc9117b317ceb81d8d1'})
                navigation.navigate("MainPageScreen")
            }}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="white"/>
                </Svg>
            </TouchableOpacity>
            <View style={{...styles.barArea, width: windowSize, height: windowSize}}>
                <Camera
                    style={{width: windowSize, height: windowSize}}
                    barCodeScannerSettings={{
                      barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}
                    flashMode={torch ? FlashMode.torch : FlashMode.off}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
                
            </View>
            <AppButton mini={true} style={styles.btnMin} onPress={() => {
                setTorch(!torch)
                // lanternFunc()
                // console.log('torch', torch)
            }}>
                Фонарик
            </AppButton>
            {infoRender()}
            {/* {timerFun()} */}
            {errorBlock()}
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    errorText: {
        width: "100%",
        textAlign: "center",
        marginTop: 80
    },
    btnMin: {
        marginTop: 20
    },
    timer: {
        marginTop: 30,
        marginBottom: 30
    },
    timerText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    timerTextTitle: {
        fontSize: 18
    },
    timerTextNum: {
        fontSize: 40,
        marginLeft: 20,
        color: THEME.RED,
        opacity: .6
    },
    text: {
        marginBottom: 5
    },
    textBlock: {
        width: "100%"
    },
    user: {
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        marginTop: 30,
        marginBottom: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wrap: {
        position: "relative",
        paddingTop: 90,
        backgroundColor: 'transparent',
        alignItems: "center"
    },
    back: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: -20,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        top: 45
    },
    barArea: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        width: "100%",
        marginTop: 40,
        marginBottom: 40
    },
    bar: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textError: {
        color: THEME.RED
    },
    bottom: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: 15,
        left: 0,
        width: "100%",
        padding: 5,
        borderRadius: 8,
        backgroundColor: "white",
        textAlign: "center"
    }
})

const Stack = createStackNavigator()

export const ScannerScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="ItemWrapper" component={ItemWrapper} />
        </Stack.Navigator>
    )
}