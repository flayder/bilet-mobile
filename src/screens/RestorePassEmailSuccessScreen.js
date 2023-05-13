import React, {useLayoutEffect } from "react"
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import {createStackNavigator } from '@react-navigation/stack'
import {LinkTo, emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { AppButton } from "../ui/AppButton";

const RestorePassEmailWrapper = ({route, navigation}) => {
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

    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} height={-150} measure={true}>
            <View style={styles.form}>
                <AppText style={styles.title}>
                    Готово
                </AppText>
                <AppText style={styles.subtitle}>
                    На вашу почту отправлен{"\n"}новый пароль
                </AppText>
            </View>
            <View style={styles.btnShort}>
                <AppButton onPress={() => {
                    LinkTo("SignInScreen", navigation)
                }}>
                    Войти
                </AppButton>
                <TouchableOpacity>
                    <AppText style={styles.link}>
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

export const RestorePassEmailSuccessScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="RestorePassEmailWrapper" component={RestorePassEmailWrapper} />
        </Stack.Navigator>
    )
}