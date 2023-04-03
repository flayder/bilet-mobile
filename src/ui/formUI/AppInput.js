import React, {useState, useRef} from "react"
import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native"
import {THEME} from "../../../theme";
import {AppText} from "../AppText";

export default (
    {
        style,
        checkbox = false,
        PlaceholderWithIcon,
        placeholderWithIconText,
        inputStyle,
        placeholder,
        outline = false,
        value = "",
        onResult,
        type = false,
        editable = true
    }) => {
    const checkboxClass = checkbox ? {textAlignVertical: "top", height: 80} : {}
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState(value)
    const ref = useRef()
    if(outline && value != text) setText(value)
    return (
        <View style={{...styles.wrap, ...style}}>
            {
                PlaceholderWithIcon && !focused && text == ""
                    ?
                    <TouchableOpacity
                        style={styles.icon}
                        activeOpacity={1}
                        onPress={() => {
                            //setFocused(true)
                            //console.log('ref.current', focused, ref.current)
                            if(ref.current !== undefined)
                                ref.current.focus()
                        }}
                    >
                        <PlaceholderWithIcon />
                        <View style={{width: 10}}></View>
                        <AppText style={styles.placeholderText}>
                            {placeholderWithIconText}
                        </AppText>
                    </TouchableOpacity>
                    :
                    <></>
            }
            <TextInput
                style={{...styles.input, ...checkboxClass, ...inputStyle}}
                placeholder={placeholder}
                multiline={checkbox}
                ref={ref}
                editable={editable}
                placeholderTextColor={THEME.GREY_TEXT}
                secureTextEntry={type}
                onBlur={() => {
                    if(PlaceholderWithIcon) setFocused(false)
                }}
                onChangeText={value => {
                    setText(value)
                    if(onResult) onResult(value)
                }}
                value={(text && text != null && text != 'null') ? text : ""}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        position: "relative"
    },
    placeholderText: {
        color: THEME.GREY,
        marginTop: 0,
        marginBottom: 0
    },
    icon: {
        position: "absolute",
        left: 0,
        top: "50%",
        marginTop: -30,
        zIndex: 9,
        width: "100%",
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: THEME.BLUE_BORDER,
        borderRadius: 6,
        width: "100%",
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        // marginTop: 5,
        // marginBottom: 5,
        fontSize: 16
    }
})