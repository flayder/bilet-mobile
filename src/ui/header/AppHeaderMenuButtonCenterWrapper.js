import React, {useEffect, useState} from "react"
import {View, StyleSheet, Platform} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { AppText } from "../AppText"
import { THEME } from "../../../theme"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, logout } from "../../store/actions/user"
import { AppFetch } from "../../AppFetch"

export default ({navigation, route, children}) => {
    const dispatch = useDispatch()
    const init = true
    const user = useSelector(state => state.user.currentUser)

    useEffect(() => {
        dispatch(getCurrentUser(navigation))
    }, [init])

    let color = THEME.RED

    if(user && typeof user == "object" && user.hasOwnProperty('id')) {
        color = THEME.GREEN
    }
    
    let paddingBottom = 4

    if(Platform.OS == "ios")
        paddingBottom = 14

    const logOut = async () => {
        await AppFetch.logOut()
        dispatch(logout())
        navigation.navigate("SignInScreen")
    }

    return (
        <View style={{...styles.style, paddingBottom}}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("SearchScreen")
            }}>
                <AppText style={{...styles.text, color: "white"}}>
                    Поиск
                </AppText>
            </TouchableOpacity>
            {
                user && typeof user == "object" && user.hasOwnProperty('id')
                    ? 
                <AppText style={{...styles.text, color}}>
                    Online
                </AppText>
                    : 
                <AppText style={{...styles.text, color}}>
                    Offline
                </AppText>
            }
            <TouchableOpacity onPress={() => {
                logOut().then(res => {})
                dispatch(logout())
            }}>
                <AppText style={{...styles.text, color: "white"}}>
                    Выход
                </AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    style: {
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        height: 20
    }
})