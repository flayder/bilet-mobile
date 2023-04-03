import React, {useState} from "react"
import {StyleSheet, ImageBackground} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {useSelector, useDispatch} from "react-redux";
import {Svg, Path} from "react-native-svg";
import {setGlobalMuted} from "../../store/actions/other";
import {THEME} from "../../../theme";

export default ({style, onPress, onChange, navigation}) => {
    const dispatch = useDispatch()
    const muted = useSelector(state => state.others.muted)
    const user = useSelector(state => state.chat.user_to)
    const [load, setLoad] = useState(false)
    //console.log('okokok')
    return (
        <></>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 80,
        height: 60,
        position: "relative",
        marginLeft: -10,
        marginTop: -5,
        zIndex: 99,
    },
    wrap: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
})