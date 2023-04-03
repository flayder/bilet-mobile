import React, {useEffect, useLayoutEffect, useState} from "react"
import {createStackNavigator} from "@react-navigation/stack";
import {DB} from "../db";
import {emptyNavigation} from "../../global";
import { View, Text, StyleSheet } from "react-native";
import { AppWrap } from "../ui/AppWrap";
import { THEME } from "../../theme";
import { AppText } from "../ui/AppText";

const LoadingWrapper = ({navigation}) => {
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

    const init = true

    useEffect(() => {
        DB.getUser().then(user => {
            let token = false
            if(user.hasOwnProperty('token') && user.token)
                token = user.token
    
            if(!token) {
                setTimeout(() => {
                    navigation.navigate("SignInScreen")
                }, 1000)
            } else {
                navigation.navigate("MainPageScreen")
            }
        })
    }, [init])

    return <AppWrap container={{backgroundColor: THEME.BLUE}} wrap={style} measure={true}>
        <AppText>Logo</AppText>
    </AppWrap>

    // return <LoadingBar delay={500} onFinish={() => {
    //     setTimeout(() => {
    //         if(state.current)
    //            navigation.navigate("MainPageScreen")
    //         else
    //            navigation.navigate("NotificationSwitchScreen")
    //     }, 100)
    // }} />
}

const style = StyleSheet.create({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: "100%",
})


const Stack = createStackNavigator()

export const LoadingScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="LoadingWrapper" component={LoadingWrapper} />
        </Stack.Navigator>
    )
}
//let {width, height} = Dimensions.get('screen')