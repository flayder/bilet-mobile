import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {THEME} from "../../theme";
import { useDispatch } from "react-redux";
import { getDetailData } from "../store/actions/bilet";
import { useNavigation } from "@react-navigation/native";
import { LinkTo } from "../../global";

export default ({style, item, back}) => {
    let color = THEME.RED

    const navigation = useNavigation()
    const dispatch = useDispatch()

    if(item.status.id == 2)
        color = THEME.GREEN


    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            dispatch(getDetailData(item.id))
            LinkTo("DetailScreen", navigation, {back})
        }}>
            <View style={styles.header}>
                <AppTextBold style={styles.name}>
                    Билет {item.id}
                </AppTextBold>
                <AppText style={{...styles.status, color}}>
                    {item.status.name}
                </AppText>
            </View>
            <View style={styles.body}>
                <View style={styles.row}>
                    <AppText style={styles.text}>Номер билета</AppText>
                    <AppText style={{...styles.text, ...styles.textRight}}>{item.id}</AppText>
                </View>
                <View style={styles.row}>
                    <AppText style={styles.text}>Ряд, место, категория</AppText>
                    <AppText style={{...styles.text, ...styles.textRight}}>
                        {
                            item.place ? `${item.place.row}, ${item.place.name}` : ''
                        }
                        {
                            item.place ? ', ' : ''
                        }
                        {
                            item.category ? item.category.name : 'нет'
                        }
                    </AppText>
                </View>
                <View style={styles.row}>
                    <AppText style={styles.text}>Номер заказа</AppText>
                    <AppText style={{...styles.text, ...styles.textRight}}>{item.order}</AppText>
                </View>
                <View style={styles.row}>
                    <AppText style={styles.text}>Дополнительная информация</AppText>
                    <AppText style={styles.text}></AppText>
                </View>
                <View style={styles.row}>
                    <AppText style={styles.text}>Стоимость</AppText>
                    <AppText style={{...styles.text, ...styles.textRight}}>
                        {
                            item.pricing > 0 ? `${item.pricing} ₽` : 'Бесплатно'
                        }
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: THEME.SKY,
        borderRadius: 8,
        marginTop: 15
    },
    row: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textRight: {
        fontSize: 18,
        width: 100,
        overflow: 'hidden',
        textAlign: 'right'
    },
    text: {
        marginTop: 7,
        marginBottom: 7
    },
    name: {
        fontSize: 18
    },
    status: {
        fontSize: 18
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: .5,
        borderColor: THEME.BLUE
    },
    body: {
        paddingTop: 10,
        paddingBottom: 10
    },
})