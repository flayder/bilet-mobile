import React, {useLayoutEffect, useState} from "react"
import { View, StyleSheet, TouchableOpacity, Alert} from "react-native"
import {createStackNavigator} from "@react-navigation/stack";
import { AppWrap } from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { AppAuthorizeInput } from "../ui/AppAuthorizeInput";
import { AppButton } from "../ui/AppButton";
import { AppErrorMessage } from "../ui/AppErrorMessage";
import { THEME } from "../../theme";
import { LinkTo, emptyNavigation } from "../../global";
import { AppFetch } from "../AppFetch";
import { DB } from "../db";


const SignInWrapper = ({navigation, route}) => {
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [emailCorrect, setEmailCorrect] = useState(false)
    const [passwordCorrect, setPassCorrect] = useState(false)
    const [inCorrectAuth, setIncorrectAuth] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    //console.log('email', email)
    //console.log('password', password)
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

    
    const signIn = async () => {
        if(emailCorrect && passwordCorrect) {
            const data = new FormData
            data.append('login', email)
            data.append('password', password)

            const response =  await AppFetch.post("/userchecker/auth/", data)
            //const response = {"results": {"token": "d0fe0de499b90f5a422fe06990544ca2cd896454", "email": "test@test.ru", "id": 4, "lastname": null, "login": "test1", "phone": "2123123123", "surname": null, "user": null, "username": null}, "status": 200}
            console.log('response', response)
            if(response.results && typeof response.results == "object" && response.results.hasOwnProperty('token')) {
                setIncorrectAuth(false)
                const user = await DB.getUser()
                const res = await DB.update({
                    table_name: "user",
                    names: ["login", "password", "token"],
                    values: [email, password, response.results.token],
                    where: `id = ${user.id}`
                })

                //console.log(email, password, response.data.token)
                navigation.navigate("MainPageScreen")
                return Promise.resolve(1)
            } else if(response.hasOwnProperty('errors') && Array.isArray(response.errors) && response.errors.length > 0) {
                Alert.alert(
                    response.errors[0],
                    "",
                    [
                        {
                            text: "Повторить попытку",
                            onPress: () => {}
                        },
                        {
                            text: "Восстановить пароль",
                            onPress: () => {
                                navigation.navigate("RestorePassEmailScreen", {
                                    screen: "RestorePassEmailWrapper",
                                    params: {
                                        email
                                    }
                                })
                            },
                            style: "cancel"
                        },
                        {}
                    ],
                    { cancelable: false }
                );
            }
        } else {
            setErrorMessage('Поля для авторизации заполнены некорретно')
            setIncorrectAuth(true)
        }
        return Promise.resolve(0)
    }
    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} height={-120} measure={true}>
            <View style={styles.form}>
                <AppText style={styles.title}>
                    Вход
                </AppText>
                <AppErrorMessage errorMessage={errorMessage} toShow={inCorrectAuth} />
                <AppAuthorizeInput
                    //rule={GLOBAL_CONST.emailValidation}
                    placeholder="Логин"
                    error="Некорректный логин"
                    onCorrect={correct => {
                        setEmailCorrect(correct)
                    }}
                    onResult={email => {
                        setEmail(email)
                    }}
                />
                <AppAuthorizeInput
                    rule={/^[a-z0-9]{5,}$/i}
                    placeholder="Пароль"
                    error="Пароль должен содержать не меньше 5 латинских символов и цифр"
                    type="password"
                    onCorrect={correct => {
                        setPassCorrect(correct)
                    }}
                    onResult={pass => {
                        setPass(pass)
                    }}
                />
            </View>
            <View style={styles.btnShort}>
                <AppButton onPress={() => {
                    signIn().then(response => {
                        
                    })
                }}>
                    Войти
                </AppButton>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("RestorePassEmailScreen")
                }}>
                    <AppText style={styles.link}>
                        Забыли пароль?
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
        marginBottom: 40,
        fontSize: 20
    },
    link: {
        color: THEME.GREY,
        width: "100%",
        textAlign: "center"
    }
})

const Stack = createStackNavigator()

export const SignInScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignInWrapper" component={SignInWrapper} />
        </Stack.Navigator>
    )
}