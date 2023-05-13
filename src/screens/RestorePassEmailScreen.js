import React, {useLayoutEffect, useState} from "react"
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet, TouchableOpacity, Alert} from "react-native"
import {createStackNavigator } from '@react-navigation/stack'
import {LinkTo, emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import {GLOBAL_CONST} from "../../global";
import {AppWrap} from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { AppFetch } from "../AppFetch";
import { AppErrorMessage } from "../ui/AppErrorMessage";
import { AppButton } from "../ui/AppButton";

const RestorePassEmailWrapper = ({route, navigation}) => {
    const [email, setEmail] = useState("")
    const [emailCorrect, setEmailCorrect] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [inCorrectAuth, setIncorrectAuth] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                height: 50,
                ...emptyNavigation
            }
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })

    const restore = async () => {
        if(errorMessage)
            setErrorMessage("")

        if(inCorrectAuth)
            setIncorrectAuth(false)
        
        if(!emailCorrect) {
            setIncorrectAuth(true)
            if(!email)
                setErrorMessage("Вы не ввели почту")
            else
                setErrorMessage("Некорректный email")
            
            return
        }
            

        const data = new FormData

        data.append('email', email)

        const response = await AppFetch.post("/userchecker/restore_pass/", data)
        console.log('responseresponse', response)
        if(response.status == 200) {
            LinkTo("RestorePassEmailSuccessScreen", navigation)
        } else if(Array.isArray(response.errors) && response.errors.length > 0) {
            setIncorrectAuth(true)
            setErrorMessage(response.errors[0])
        }

        Promise.resolve(1)
    }

    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} measure={true}>
            <View style={styles.form}>
                <AppText style={styles.title}>
                    Восстановление пароля
                </AppText>
                <AppText style={styles.subtitle}>
                    На вашу почту будет отправлен{"\n"}новый пароль
                </AppText>
                <AppErrorMessage errorMessage={errorMessage} toShow={inCorrectAuth} />
                <AppAuthorizeInput
                    rule={GLOBAL_CONST.emailValidation}
                    onCorrect={correct => {
                        setEmailCorrect(correct)
                    }}
                    placeholder="Email"
                    error="Некорректный email"
                    onResult={email => {
                        setEmail(email)
                        if(inCorrectAuth)
                            setIncorrectAuth(false)
                    }}
                />
            </View>
            <View style={styles.btnShort}>
                <AppButton onPress={() => {
                    restore().then(res => {

                    })
                }}>
                    Отправить
                </AppButton>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("SignInScreen")
                }}>
                    <AppText style={styles.link}>
                        Вход
                    </AppText>
                </TouchableOpacity>
                <View style={{marginTop: 20}}></View>
            </View>
            
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "column",
        justifyContent: "center",
        position: "relative"
    },
    btnShort: {
        position: "absolute",
        left: 0,
        width: "100%",
        bottom: 0
    },
    title: {
        textAlign: "center",
        color: THEME.BLUE,
        marginBottom: 0,
        fontSize: 20
    },
    subtitle: {
        textAlign: "center",
        color: THEME.GREY,
        marginBottom: 20,
        fontSize: 16
    },
    link: {
        color: THEME.GREY,
        width: "100%",
        textAlign: "center"
    }
})

const Stack = createStackNavigator()

export const RestorePassEmailScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="RestorePassEmailWrapper" component={RestorePassEmailWrapper} />
        </Stack.Navigator>
    )
}