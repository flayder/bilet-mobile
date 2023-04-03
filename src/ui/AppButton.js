import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {AppText} from "./AppText";
import {THEME} from "../../theme";

export const AppButton = (
    {
        style,
        onPress,
        mini = false,
        activeOpacity = 1,
        color = THEME.BLACK,
        textColor = "#fff",
        children = <></>
    }) => {

    const [click, setClick] = useState(false)
    const opacity = (!click) ? 1 : .9
    let wr = {
        paddingTop: 8,
        paddingBottom: 8,
        height: 50
    }
    let fs = 16

    if(mini) {
        wr = {
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 10,
            height: 25
        }
        fs = 14
    }

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={{...styles.wrap, ...wr, ...style, opacity: opacity, backgroundColor: color}}
            onPress={onPress}
            // onPressIn={() => {
            //     setClick(true)
            // }}
            // onPressOut={() => {
            //     setClick(false)
            // }}
        >
            <AppText style={{...styles.text, fontSize: fs, color: textColor}}>
                {children}
            </AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    wrap: {
        position: "relative",
        borderRadius: 6,
        
        minWidth: 100,
        width: "auto",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        textAlign: "center",
        textTransform: "uppercase"
    }
})