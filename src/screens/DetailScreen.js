import React, {useEffect, useLayoutEffect, useRef, useState } from "react"
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import {createStackNavigator } from '@react-navigation/stack'
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { useSelector } from "react-redux"
import { globalAlert, mainHeader } from "../globalHeaders"
import moment from "moment/moment";
import { AppTextBold } from "../ui/AppTextBold";
import { AppButton } from "../ui/AppButton";
import { Svg, Path } from "react-native-svg";
import { AppFetch } from "../AppFetch";
import { LinkTo } from "../../global";

const ItemWrapper = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions(mainHeader({navigation, route}), [navigation])
    })

    //if(route.para)
    let back = ''
    if(route.params && typeof route.params == "object" && route.params.hasOwnProperty('back')) {
        back = route.params.back
    }

    const item = useSelector(state => state.bilet.detail)
    const [reload, setReload] = useState(false)
    const init = true

    //console.log('item', item)

    const getUserName = () => {
        let name = ''

        if(typeof item && item.hasOwnProperty('id')) {
            if(item.user.username || item.user.surname || item.user.lastname) {
                if(item.user.surname) {
                    name += `${item.user.surname} `
                }
        
                if(item.user.username) {
                    name += `${item.user.username} `
                }
    
                if(item.user.lastname) {
                    name += `${item.user.lastname} `
                }
            } else if (item.user.legal_first_name || item.user.legal_name || item.user.legal_last_name) {
                if(item.user.legal_first_name) {
                    name += `${item.user.legal_first_name} `
                }
        
                if(item.user.legal_name) {
                    name += `${item.user.legal_name} `
                }
    
                if(item.user.legal_last_name) {
                    name += `${item.user.legal_last_name} `
                }
            } else {
                name += 'Имя не указано'
            }
        }

        return name
    }

    const activate = () => {
        const data = new FormData
        data.append('activate', item.id)

        AppFetch.putWithToken({url: `/userchecker/checkout/${item.id}/`, body: data}).then(response => {
            if(response.results) {
                globalAlert({
                    title: item.product.name,
                    text: "Вход успешно подтвержден"
                })
            } else if(response.hasOwnProperty('error')) {
                globalAlert({
                    title: item.product.name,
                    text: response.error
                })
            } else {
                globalAlert({
                    title: item.product.name,
                    text: "Вход не был подтвержден"
                })
            }
        })
    }

    let color = THEME.RED

    if(typeof item && item.hasOwnProperty('status') && item.status.id == 2)
        color = THEME.GREEN

    useEffect(() => {
    }, [init])

    if(typeof item == "object" && item.hasOwnProperty('id')) {
        return (
            <AppWrap wrap={{...styles.wrap}} measure={true} height={-150}>
                <TouchableOpacity style={styles.back} onPress={() => {
                    LinkTo(back, navigation)
                }}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill={THEME.BLACK} />
                    </Svg>
                </TouchableOpacity>
                <AppText style={styles.title}>
                    {item.product.name} {"\n"} Билет {item.id}
                </AppText>
                <View style={styles.item}>
                    <View style={styles.header}>
                        <AppTextBold style={styles.name}>
                            Детальная информация
                        </AppTextBold>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Номер билета</AppText>
                            <AppText style={{...styles.text, ...styles.textRight}}>{item.id}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Номер заказа</AppText>
                            <AppText style={{...styles.text, ...styles.textRight}}>{item.order}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Имя клиента</AppText>
                            <AppText style={{...styles.text, ...styles.textRight}}>{getUserName()}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Статус</AppText>
                            <AppText style={{...styles.text, ...styles.textRight, color}}>{item.status.name}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Ряд, место, категория</AppText>
                            <AppText style={{...styles.text, ...styles.textRight}}>
                                {
                                    item.place ? `${item.place.row}, ${item.place.name}` : ''
                                }
                                {
                                    item.place ? ', ' : ''
                                }
                                {
                                    item.category ? item.category.name : 'нет'
                                }
                            </AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Дополнительная информация</AppText>
                            <AppText style={styles.text}></AppText>
                        </View>
                        {
                            item.user.email && <View style={styles.row}>
                                <AppText style={styles.text}>Почта</AppText>
                                <AppText style={{...styles.text, ...styles.textRight}}>{item.user.email}</AppText>
                            </View>
                        }
                        {
                            item.user.phone && <View style={styles.row}>
                                <AppText style={styles.text}>Телефон</AppText>
                                <AppText style={{...styles.text, ...styles.textRight}}>{item.user.phone}</AppText>
                            </View>
                        }
                        <View style={styles.row}>
                            <AppText style={styles.text}>Дата и время покупки</AppText>
                            <AppText style={{...styles.text, ...styles.textRight}}>{moment().format('d.MM.YYYY hh:mm')}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.text}>Стоимость</AppText>
                            <AppText style={{...styles.text, ...styles.textRight}}>
                                {
                                    item.pricing > 0 ? `${item.pricing} ₽` : 'Бесплатно'
                                }
                            </AppText>
                        </View>
                        <AppButton style={styles.btn} onPress={() => {
                            activate()
                        }}>
                            Подтвердить вход
                        </AppButton>
                    </View>
                    
                </View>
            </AppWrap>
        )
    }

    return <></>
}

const styles = StyleSheet.create({
    back: {
        width: 50,
        height: 50,
        position: 'absolute',
        //backgroundColor: "red",
        left: -20,
        zIndex: 10,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        top: 15
    },
    btn: {
        marginTop: 40
    },
    title: {
        fontSize: 22,
        textAlign: "center"
    },
    search: {
        marginTop: 15,
        marginBottom: 15,
        borderColor: THEME.GREY
    },
    item: {
        backgroundColor: THEME.SKY,
        borderRadius: 8,
        marginTop: 15
    },
    row: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textRight: {
        fontSize: 18,
        width: 100,
        overflow: 'hidden',
        textAlign: 'right'
    },
    text: {
        marginTop: 7,
        marginBottom: 7
    },
    name: {
        fontSize: 18
    },
    status: {
        fontSize: 18
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: .5,
        borderColor: THEME.BLUE
    },
    body: {
        paddingTop: 10,
        paddingBottom: 10
    },
})

const Stack = createStackNavigator()

export const DetailScreen = ({route}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{tabBarVisible: false}} name="ItemWrapper" component={ItemWrapper} />
        </Stack.Navigator>
    )
}