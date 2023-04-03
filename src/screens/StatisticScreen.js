import React, {useEffect, useLayoutEffect, useRef, useState } from "react"
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet } from "react-native"
import {createStackNavigator } from '@react-navigation/stack'
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { useDispatch, useSelector } from "react-redux"
import { mainHeader } from "../globalHeaders"
import { AppFetch } from "../AppFetch";
import { getDataList, getDataLists, setSearchInput } from "../store/actions/bilet";
import AppItem from "../ui/AppItem";

const ItemWrapper = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions(mainHeader({navigation, route}), [navigation])
    })

    const dispatch = useDispatch()
    const product = useRef()
    const statistic = useRef()


    if(route.params && typeof route.params == "object") {
        if(route.params.hasOwnProperty('product')) {
            product.current = route.params.product
        }

        if(route.params.hasOwnProperty('statistic')) {
            statistic.current = route.params.statistic
        }
    }

    //console.log('statistic', statistic)

    const items = useSelector(state => state.bilet.list)
    const init = route.params && typeof route.params == "object" ? route.params.hash : false

    const getDublicates = () => {
        if(statistic.current.hasOwnProperty('checkin') && Array.isArray(statistic.current.checkin)) {
            return statistic.current.checkin.filter(item => item.id == 3).length
        }

        return 0
    }

    const getSuccess = () => {
        if(statistic.current.hasOwnProperty('checkin') && Array.isArray(statistic.current.checkin)) {
            return statistic.current.checkin.filter(item => item.id == 1).length
        }

        return 0
    }

    const getNobd = () => {
        if(statistic.current.hasOwnProperty('checkin') && Array.isArray(statistic.current.checkin)) {
            return statistic.current.checkin.filter(item => item.id == 4).length
        }

        return 0
    }

    //console.log('search', searching)
    //console.log('items', items)

    //console.log('data', data)

    //console.log('init', init)
    //console.log('product', statistic)

    useEffect(() => {
        if(product.current && typeof product.current == "object" && product.current.hasOwnProperty('id'))
            dispatch(getDataLists(product.current.id))
    }, [init])

    return (
        <AppWrap wrap={{...styles.wrap}} measure={true}>
            {
                product.current && product.current.hasOwnProperty('id') && <>
                    <AppText style={styles.title}>
                        {product.current.name}
                    </AppText>
                    <View style={styles.statistic}>
                        <View style={styles.header}>
                            <AppText style={styles.head}>Статистика</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.leftText}>Дубликаты - шт.</AppText>
                            <AppText style={styles.num}>{getDublicates()}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.leftText}>Нет в бд - шт.</AppText>
                            <AppText style={styles.num}>{getNobd()}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.leftText}>Пройдено - шт.</AppText>
                            <AppText style={styles.num}>{getSuccess()}</AppText>
                        </View>
                    </View>
                </>
            }
            {
                Array.isArray(items) && items.map((item, key) => {
                    return <AppItem 
                        key={key}
                        item={item} 
                        back={"StatisticScreen"}
                    />
                })
            }
            
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        textAlign: "center"
    },
    statistic: {
        backgroundColor: THEME.SKY,
        borderRadius: 10
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 2,
        paddingBottom: 2,
        borderBottomColor: THEME.BLUE,
        borderBottomWidth: 1
    },
    head: {
        fontSize: 20  
    },
    btnPanel: {
        position: 'absolute',
        left: 0,
        width: "100%",
        bottom: 0
    },
    row: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    num: {
        fontSize: 25,
        marginTop: 0,
        marginBottom: 0
    },
    scan: {
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})

const Stack = createStackNavigator()

export const StatisticScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ItemWrapper" component={ItemWrapper} />
        </Stack.Navigator>
    )
}