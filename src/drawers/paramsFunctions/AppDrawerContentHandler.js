import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
//import SWGImage from "expo-svg-uri";
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../../../theme";
import {SHADOW} from "../../../global";
import {AppWrap} from "../../ui/AppWrap";
import {Svg, Path} from "react-native-svg";

export const AppDrawerContentHandler = ({navigation}) => {
    return (
        <AppWrap
            scroll={{backgroundColor: THEME.SLIDER_BG, paddingTop: 0, paddingBottom: 0, marginBottom: 0}}
            wrap={{justifyContent: "space-between", height: "100%", paddingTop: 0, paddingBottom: 0, marginBottom: 0}}
            measure={true}>
            <View style={StyleAppDrawerContentHandler.menuWrap}>
               
            </View>
        </AppWrap>
    )
}

const StyleAppDrawerContentHandler = StyleSheet.create({
    menuWrap: {
        width: "100%",
        padding: 30,
        height: "100%",
        //alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: THEME.SLIDER_BG
    },
    close: {
        position: "absolute",
        zIndex: 999,
        elevation: 999,
        right: 10,
        top: 37,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "red"
    },
    title: {
        width: "100%",
        textAlign: "center"
    },
    label: {
        marginTop: 0,
        marginBottom: 0,
        textAlign: "center"
    },
    setting: {
        width: "100%"
    },
    btn: {
        width: 100,
        height: 140,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        ...SHADOW
    },
    wrap: {
        width: "100%",
        height: "100%",
        justifyContent: "space-around",
        paddingTop: 15,
        alignItems: "center"
    }
})

export const AppDrawerSearchParametersContentHandler = ({navigation}) => {
    const param = useSelector(state => state.search.parameter)
    //console.log('param', param)
    const btns = {
        all: false,
        klumba: false,
        sad: false,
        ogorod: false,
        chemical: false,
        comfort: false,
        event: false
    }
    btns[param] = true
    const dispatch = useDispatch()
    return (
        <View style={StyleAppDrawerContentHandler.menuWrap}>
            
        </View>
    )
}

const styleAppDrawerSearchParametersContentHandler = StyleSheet.create({
    close: {
        width: 20,
        height: 20,
        backgroundColor: "red"
    }
})