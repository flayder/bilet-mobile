import React from "react"
import {View, StyleSheet} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { AppText } from "../AppText"

export default ({children, navigation, route, fontSize = 16}) => {
    return (
        <View style={styles.style}></View>
    )
}

const styles = StyleSheet.create({
    style: {
        width: 0,
        paddingRight: 15,
        paddingBottom: 10
    }
})