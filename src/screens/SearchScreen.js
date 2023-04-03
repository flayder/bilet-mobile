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
import AppInput from "../ui/formUI/AppInput";
import { getDataList, setSearchInput } from "../store/actions/bilet";
import AppItem from "../ui/AppItem";

const ItemWrapper = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions(mainHeader({navigation, route}), [navigation])
    })

    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const searching = useSelector(state => state.bilet.search)
    const items = useSelector(state => state.bilet.items)
    const [reload, setReload] = useState(false)
    const init = true

    const search = () => {
        if(searching && searching.length >= 1) {
            dispatch(getDataList())
        }
    }

    //console.log('search', searching)
    //console.log('items', items)

    //console.log('data', data)

    useEffect(() => {
    }, [init])

    return (
        <AppWrap wrap={{...styles.wrap}} measure={true}>
            <AppText style={styles.title}>
                Поиск по билетам
            </AppText>
            <AppInput 
                style={styles.search} 
                inputStyle={{borderColor: THEME.GREY}} 
                placeholder={"Введите номер билета"}
                onResult={text => {
                    dispatch(setSearchInput(text))
                    search()
                }}
                value={searching}
            />

            {
                Array.isArray(items) && items.map((item, key) => {
                    return <AppItem 
                        key={key}
                        item={item} 
                        back={"SearchScreen"}
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
    search: {
        marginTop: 15,
        marginBottom: 15,
        borderColor: THEME.GREY
    },
    
})

// const Tab = createBottomTabNavigator();

// const PageTab = ({navigation, route}) => {
//     //console.log('InsideTabs', route.params)
//     return (
//         <Tab.Navigator screenOptions={{
//             tabBarStyle: { display: "none" }
//         }}>
//             <Tab.Screen name={"InsideTab"} component={ItemWrapper} />
//         </Tab.Navigator>
//     )
// }

const Stack = createStackNavigator()

export const SearchScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ItemWrapper" component={ItemWrapper} />
        </Stack.Navigator>
    )
}