import React, {useEffect, useLayoutEffect, useRef, useState } from "react"
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet } from "react-native"
import {createStackNavigator } from '@react-navigation/stack'
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import { AppText } from "../ui/AppText";
import { AppButton } from "../ui/AppButton";
import { Path, Svg } from "react-native-svg"
import { useSelector } from "react-redux"
import { mainHeader } from "../globalHeaders"
import { AppFetch } from "../AppFetch";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinkTo } from "../../global";

const ItemWrapper = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions(mainHeader({navigation, route}), [navigation])
    })

    const bilet = useSelector(state => state.bilet.scanned_checkout)
    const [data, setData] = useState(false)
    const [reload, setReload] = useState(false)
    const init = route.params && typeof route.params == "object" ? route.params.hash : false

    //console.log('bilet', bilet)

    const getStatistic = () => {
        if(bilet && bilet.hasOwnProperty('product')) {
            AppFetch.getWithToken({url: "/userchecker/statistic/", params: {product: bilet.product.id}}).then(response => {
                if(response.hasOwnProperty('checkouts') && response.hasOwnProperty('checkin')) {
                    //console.log('here')
                    setData({checkouts: response.checkouts, checkin: response.checkin})
                    setReload(!reload)
                }
            })
        }
    }

    //console.log('data', data)

    useEffect(() => {
        getStatistic()
    }, [init])

    return (
        <AppWrap wrap={{...styles.wrap}} measure={true} height={-150}>
            {
                bilet && bilet.hasOwnProperty('product') && data && <>
                    <AppText style={styles.title}>
                        {bilet.product.name}
                    </AppText>
                    <TouchableOpacity style={styles.statistic} onPress={() => {
                        if(bilet) {
                            const params = {
                                product: bilet.product,
                                statistic: data
                            }

                            LinkTo("StatisticScreen", navigation, params)
                        }
                    }}>
                        <View style={styles.header}>
                            <AppText style={styles.head}>Статистика</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.leftText}>Просканировано билетов</AppText>
                            <AppText style={styles.num}>{data.checkin.length}</AppText>
                        </View>
                        <View style={styles.row}>
                            <AppText style={styles.leftText}>Продано билетов</AppText>
                            <AppText style={styles.num}>{data.checkouts}</AppText>
                        </View>
                    </TouchableOpacity>
                </>
            }
            
            <View style={styles.scan}>
                <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M1.90476 0H0V1.90476H1.90476V0Z" fill="#00AAFF"/>
                    <Path d="M3.80952 0H1.90476V1.90476H3.80952V0Z" fill="#00AAFF"/>
                    <Path d="M5.71429 0H3.80952V1.90476H5.71429V0Z" fill="#00AAFF"/>
                    <Path d="M7.61905 0H5.71429V1.90476H7.61905V0Z" fill="#00AAFF"/>
                    <Path d="M9.52381 0H7.61905V1.90476H9.52381V0Z" fill="#00AAFF"/>
                    <Path d="M11.4286 0H9.52381V1.90476H11.4286V0Z" fill="#00AAFF"/>
                    <Path d="M13.3333 0H11.4286V1.90476H13.3333V0Z" fill="#00AAFF"/>
                    <Path d="M17.1429 0H15.2381V1.90476H17.1429V0Z" fill="#00AAFF"/>
                    <Path d="M19.0476 0H17.1429V1.90476H19.0476V0Z" fill="#00AAFF"/>
                    <Path d="M20.9524 0H19.0476V1.90476H20.9524V0Z" fill="#00AAFF"/>
                    <Path d="M24.7619 0H22.8571V1.90476H24.7619V0Z" fill="#00AAFF"/>
                    <Path d="M28.5714 0H26.6667V1.90476H28.5714V0Z" fill="#00AAFF"/>
                    <Path d="M30.4762 0H28.5714V1.90476H30.4762V0Z" fill="#00AAFF"/>
                    <Path d="M32.381 0H30.4762V1.90476H32.381V0Z" fill="#00AAFF"/>
                    <Path d="M34.2857 0H32.381V1.90476H34.2857V0Z" fill="#00AAFF"/>
                    <Path d="M36.1905 0H34.2857V1.90476H36.1905V0Z" fill="#00AAFF"/>
                    <Path d="M38.0952 0H36.1905V1.90476H38.0952V0Z" fill="#00AAFF"/>
                    <Path d="M40 0H38.0952V1.90476H40V0Z" fill="#00AAFF"/>
                    <Path d="M1.90476 1.90476H0V3.80952H1.90476V1.90476Z" fill="#00AAFF"/>
                    <Path d="M13.3333 1.90476H11.4286V3.80952H13.3333V1.90476Z" fill="#00AAFF"/>
                    <Path d="M19.0476 1.90476H17.1429L17.1429 3.80952H19.0476V1.90476Z" fill="#00AAFF"/>
                    <Path d="M28.5714 1.90476H26.6667V3.80952H28.5714V1.90476Z" fill="#00AAFF"/>
                    <Path d="M40 1.90476H38.0952V3.80952H40V1.90476Z" fill="#00AAFF"/>
                    <Path d="M1.90476 3.80952H0V5.71429H1.90476V3.80952Z" fill="#00AAFF"/>
                    <Path d="M5.71429 3.80952H3.80952V5.71429H5.71429V3.80952Z" fill="#00AAFF"/>
                    <Path d="M7.61905 3.80952H5.71429V5.71429H7.61905V3.80952Z" fill="#00AAFF"/>
                    <Path d="M9.52381 3.80952H7.61905V5.71429H9.52381V3.80952Z" fill="#00AAFF"/>
                    <Path d="M13.3333 3.80952H11.4286V5.71429H13.3333V3.80952Z" fill="#00AAFF"/>
                    <Path d="M17.1429 3.80952H15.2381V5.71429H17.1429L17.1429 3.80952Z" fill="#00AAFF"/>
                    <Path d="M19.0476 3.80952H17.1429L17.1429 5.71429H19.0476V3.80952Z" fill="#00AAFF"/>
                    <Path d="M20.9524 3.80952H19.0476V5.71429H20.9524V3.80952Z" fill="#00AAFF"/>
                    <Path d="M22.8571 3.80952H20.9524V5.71429H22.8571V3.80952Z" fill="#00AAFF"/>
                    <Path d="M28.5714 3.80952H26.6667V5.71429H28.5714V3.80952Z" fill="#00AAFF"/>
                    <Path d="M32.381 3.80952H30.4762V5.71429H32.381V3.80952Z" fill="#00AAFF"/>
                    <Path d="M34.2857 3.80952H32.381V5.71429H34.2857V3.80952Z" fill="#00AAFF"/>
                    <Path d="M36.1905 3.80952H34.2857V5.71429H36.1905V3.80952Z" fill="#00AAFF"/>
                    <Path d="M40 3.80952H38.0952V5.71429H40V3.80952Z" fill="#00AAFF"/>
                    <Path d="M1.90476 5.71429H0V7.61905H1.90476V5.71429Z" fill="#00AAFF"/>
                    <Path d="M5.71429 5.71429H3.80952V7.61905H5.71429V5.71429Z" fill="#00AAFF"/>
                    <Path d="M7.61905 5.71429H5.71429V7.61905H7.61905V5.71429Z" fill="#00AAFF"/>
                    <Path d="M9.52381 5.71429H7.61905V7.61905H9.52381V5.71429Z" fill="#00AAFF"/>
                    <Path d="M13.3333 5.71429H11.4286V7.61905H13.3333V5.71429Z" fill="#00AAFF"/>
                    <Path d="M17.1429 5.71429H15.2381V7.61905H17.1429V5.71429Z" fill="#00AAFF"/>
                    <Path d="M22.8571 5.71429H20.9524V7.61905H22.8571V5.71429Z" fill="#00AAFF"/>
                    <Path d="M24.7619 5.71429H22.8571V7.61905H24.7619V5.71429Z" fill="#00AAFF"/>
                    <Path d="M28.5714 5.71429H26.6667V7.61905H28.5714V5.71429Z" fill="#00AAFF"/>
                    <Path d="M32.381 5.71429H30.4762V7.61905H32.381V5.71429Z" fill="#00AAFF"/>
                    <Path d="M34.2857 5.71429H32.381V7.61905H34.2857V5.71429Z" fill="#00AAFF"/>
                    <Path d="M36.1905 5.71429H34.2857V7.61905H36.1905V5.71429Z" fill="#00AAFF"/>
                    <Path d="M40 5.71429H38.0952V7.61905H40V5.71429Z" fill="#00AAFF"/>
                    <Path d="M1.90476 7.61905H0V9.52381H1.90476V7.61905Z" fill="#00AAFF"/>
                    <Path d="M5.71429 7.61905H3.80952V9.52381H5.71429V7.61905Z" fill="#00AAFF"/>
                    <Path d="M7.61905 7.61905H5.71429V9.52381H7.61905V7.61905Z" fill="#00AAFF"/>
                    <Path d="M9.52381 7.61905H7.61905V9.52381H9.52381V7.61905Z" fill="#00AAFF"/>
                    <Path d="M13.3333 7.61905H11.4286V9.52381H13.3333V7.61905Z" fill="#00AAFF"/>
                    <Path d="M17.1429 7.61905H15.2381V9.52381H17.1429V7.61905Z" fill="#00AAFF"/>
                    <Path d="M19.0476 7.61905H17.1429V9.52381H19.0476V7.61905Z" fill="#00AAFF"/>
                    <Path d="M22.8571 7.61905H20.9524V9.52381H22.8571V7.61905Z" fill="#00AAFF"/>
                    <Path d="M24.7619 7.61905H22.8571V9.52381H24.7619V7.61905Z" fill="#00AAFF"/>
                    <Path d="M28.5714 7.61905H26.6667V9.52381H28.5714V7.61905Z" fill="#00AAFF"/>
                    <Path d="M32.381 7.61905H30.4762V9.52381H32.381V7.61905Z" fill="#00AAFF"/>
                    <Path d="M34.2857 7.61905H32.381V9.52381H34.2857V7.61905Z" fill="#00AAFF"/>
                    <Path d="M36.1905 7.61905H34.2857V9.52381H36.1905V7.61905Z" fill="#00AAFF"/>
                    <Path d="M40 7.61905H38.0952V9.52381H40V7.61905Z" fill="#00AAFF"/>
                    <Path d="M1.90476 9.52381H0V11.4286H1.90476V9.52381Z" fill="#00AAFF"/>
                    <Path d="M13.3333 9.52381H11.4286V11.4286H13.3333V9.52381Z" fill="#00AAFF"/>
                    <Path d="M17.1429 9.52381H15.2381V11.4286H17.1429V9.52381Z" fill="#00AAFF"/>
                    <Path d="M19.0476 9.52381H17.1429V11.4286H19.0476V9.52381Z" fill="#00AAFF"/>
                    <Path d="M20.9524 9.52381H19.0476V11.4286H20.9524V9.52381Z" fill="#00AAFF"/>
                    <Path d="M24.7619 9.52381H22.8571V11.4286H24.7619V9.52381Z" fill="#00AAFF"/>
                    <Path d="M28.5714 9.52381H26.6667V11.4286H28.5714V9.52381Z" fill="#00AAFF"/>
                    <Path d="M40 9.52381H38.0952V11.4286H40V9.52381Z" fill="#00AAFF"/>
                    <Path d="M1.90476 11.4286H0V13.3333H1.90476V11.4286Z" fill="#00AAFF"/>
                    <Path d="M3.80952 11.4286H1.90476V13.3333H3.80952V11.4286Z" fill="#00AAFF"/>
                    <Path d="M5.71429 11.4286H3.80952V13.3333H5.71429V11.4286Z" fill="#00AAFF"/>
                    <Path d="M7.61905 11.4286H5.71429V13.3333H7.61905V11.4286Z" fill="#00AAFF"/>
                    <Path d="M9.52381 11.4286H7.61905V13.3333H9.52381V11.4286Z" fill="#00AAFF"/>
                    <Path d="M11.4286 11.4286H9.52381V13.3333H11.4286V11.4286Z" fill="#00AAFF"/>
                    <Path d="M13.3333 11.4286H11.4286V13.3333H13.3333V11.4286Z" fill="#00AAFF"/>
                    <Path d="M17.1429 11.4286H15.2381V13.3333H17.1429V11.4286Z" fill="#00AAFF"/>
                    <Path d="M20.9524 11.4286H19.0476L19.0476 13.3333H20.9524V11.4286Z" fill="#00AAFF"/>
                    <Path d="M24.7619 11.4286H22.8571V13.3333H24.7619V11.4286Z" fill="#00AAFF"/>
                    <Path d="M28.5714 11.4286H26.6667V13.3333H28.5714V11.4286Z" fill="#00AAFF"/>
                    <Path d="M30.4762 11.4286H28.5714V13.3333H30.4762V11.4286Z" fill="#00AAFF"/>
                    <Path d="M32.381 11.4286H30.4762V13.3333H32.381V11.4286Z" fill="#00AAFF"/>
                    <Path d="M34.2857 11.4286H32.381V13.3333H34.2857V11.4286Z" fill="#00AAFF"/>
                    <Path d="M36.1905 11.4286H34.2857V13.3333H36.1905V11.4286Z" fill="#00AAFF"/>
                    <Path d="M38.0952 11.4286H36.1905V13.3333H38.0952V11.4286Z" fill="#00AAFF"/>
                    <Path d="M40 11.4286H38.0952V13.3333H40V11.4286Z" fill="#00AAFF"/>
                    <Path d="M19.0476 13.3333H17.1429L17.1429 15.2381H19.0476L19.0476 13.3333Z" fill="#00AAFF"/>
                    <Path d="M20.9524 13.3333H19.0476L19.0476 15.2381H20.9524V13.3333Z" fill="#00AAFF"/>
                    <Path d="M24.7619 13.3333H22.8571V15.2381H24.7619V13.3333Z" fill="#00AAFF"/>
                    <Path d="M5.71429 15.2381H3.80952V17.1429H5.71429V15.2381Z" fill="#00AAFF"/>
                    <Path d="M7.61905 15.2381H5.71429V17.1429H7.61905V15.2381Z" fill="#00AAFF"/>
                    <Path d="M9.52381 15.2381H7.61905V17.1429H9.52381V15.2381Z" fill="#00AAFF"/>
                    <Path d="M11.4286 15.2381H9.52381V17.1429H11.4286V15.2381Z" fill="#00AAFF"/>
                    <Path d="M13.3333 15.2381H11.4286V17.1429H13.3333V15.2381Z" fill="#00AAFF"/>
                    <Path d="M15.2381 15.2381H13.3333V17.1429H15.2381V15.2381Z" fill="#00AAFF"/>
                    <Path d="M19.0476 15.2381H17.1429V17.1429H19.0476V15.2381Z" fill="#00AAFF"/>
                    <Path d="M20.9524 15.2381H19.0476V17.1429H20.9524V15.2381Z" fill="#00AAFF"/>
                    <Path d="M22.8571 15.2381H20.9524V17.1429H22.8571V15.2381Z" fill="#00AAFF"/>
                    <Path d="M24.7619 15.2381H22.8571V17.1429H24.7619V15.2381Z" fill="#00AAFF"/>
                    <Path d="M26.6667 15.2381L24.7619 15.2381V17.1429H26.6667V15.2381Z" fill="#00AAFF"/>
                    <Path d="M30.4762 15.2381H28.5714V17.1429H30.4762V15.2381Z" fill="#00AAFF"/>
                    <Path d="M32.381 15.2381H30.4762V17.1429H32.381V15.2381Z" fill="#00AAFF"/>
                    <Path d="M34.2857 15.2381H32.381V17.1429H34.2857V15.2381Z" fill="#00AAFF"/>
                    <Path d="M36.1905 15.2381H34.2857V17.1429H36.1905V15.2381Z" fill="#00AAFF"/>
                    <Path d="M40 15.2381H38.0952V17.1429H40V15.2381Z" fill="#00AAFF"/>
                    <Path d="M1.90476 17.1429H0V19.0476H1.90476V17.1429Z" fill="#00AAFF"/>
                    <Path d="M5.71429 17.1429H3.80952V19.0476H5.71429V17.1429Z" fill="#00AAFF"/>
                    <Path d="M7.61905 17.1429H5.71429V19.0476H7.61905V17.1429Z" fill="#00AAFF"/>
                    <Path d="M9.52381 17.1429H7.61905V19.0476H9.52381V17.1429Z" fill="#00AAFF"/>
                    <Path d="M22.8571 17.1429H20.9524V19.0476H22.8571V17.1429Z" fill="#00AAFF"/>
                    <Path d="M24.7619 17.1429H22.8571V19.0476H24.7619V17.1429Z" fill="#00AAFF"/>
                    <Path d="M30.4762 17.1429H28.5714V19.0476H30.4762V17.1429Z" fill="#00AAFF"/>
                    <Path d="M32.381 17.1429H30.4762V19.0476H32.381V17.1429Z" fill="#00AAFF"/>
                    <Path d="M34.2857 17.1429H32.381V19.0476H34.2857V17.1429Z" fill="#00AAFF"/>
                    <Path d="M40 17.1429H38.0952V19.0476H40V17.1429Z" fill="#00AAFF"/>
                    <Path d="M1.90476 19.0476H0V20.9524H1.90476V19.0476Z" fill="#00AAFF"/>
                    <Path d="M7.61905 19.0476H5.71429V20.9524H7.61905V19.0476Z" fill="#00AAFF"/>
                    <Path d="M9.52381 19.0476H7.61905V20.9524H9.52381V19.0476Z" fill="#00AAFF"/>
                    <Path d="M13.3333 19.0476H11.4286V20.9524H13.3333V19.0476Z" fill="#00AAFF"/>
                    <Path d="M15.2381 19.0476H13.3333V20.9524H15.2381V19.0476Z" fill="#00AAFF"/>
                    <Path d="M19.0476 19.0476H17.1429V20.9524H19.0476V19.0476Z" fill="#00AAFF"/>
                    <Path d="M20.9524 19.0476L19.0476 19.0476V20.9524H20.9524V19.0476Z" fill="#00AAFF"/>
                    <Path d="M22.8571 19.0476H20.9524V20.9524H22.8571V19.0476Z" fill="#00AAFF"/>
                    <Path d="M30.4762 19.0476H28.5714V20.9524H30.4762V19.0476Z" fill="#00AAFF"/>
                    <Path d="M34.2857 19.0476H32.381V20.9524H34.2857V19.0476Z" fill="#00AAFF"/>
                    <Path d="M40 19.0476H38.0952V20.9524H40V19.0476Z" fill="#00AAFF"/>
                    <Path d="M1.90476 20.9524H0V22.8571H1.90476V20.9524Z" fill="#00AAFF"/>
                    <Path d="M5.71429 20.9524H3.80952V22.8571H5.71429V20.9524Z" fill="#00AAFF"/>
                    <Path d="M11.4286 20.9524H9.52381V22.8571H11.4286V20.9524Z" fill="#00AAFF"/>
                    <Path d="M17.1429 20.9524H15.2381L15.2381 22.8571H17.1429L17.1429 20.9524Z" fill="#00AAFF"/>
                    <Path d="M19.0476 20.9524H17.1429L17.1429 22.8571H19.0476V20.9524Z" fill="#00AAFF"/>
                    <Path d="M22.8571 20.9524H20.9524V22.8571H22.8571V20.9524Z" fill="#00AAFF"/>
                    <Path d="M28.5714 20.9524H26.6667V22.8571H28.5714V20.9524Z" fill="#00AAFF"/>
                    <Path d="M32.381 20.9524H30.4762V22.8571H32.381V20.9524Z" fill="#00AAFF"/>
                    <Path d="M34.2857 20.9524H32.381V22.8571H34.2857V20.9524Z" fill="#00AAFF"/>
                    <Path d="M38.0952 20.9524H36.1905V22.8571H38.0952V20.9524Z" fill="#00AAFF"/>
                    <Path d="M1.90476 22.8571H0V24.7619H1.90476V22.8571Z" fill="#00AAFF"/>
                    <Path d="M9.52381 22.8571H7.61905V24.7619H9.52381V22.8571Z" fill="#00AAFF"/>
                    <Path d="M13.3333 22.8571H11.4286V24.7619H13.3333V22.8571Z" fill="#00AAFF"/>
                    <Path d="M19.0476 22.8571H17.1429L17.1429 24.7619H19.0476V22.8571Z" fill="#00AAFF"/>
                    <Path d="M20.9524 22.8571H19.0476V24.7619H20.9524V22.8571Z" fill="#00AAFF"/>
                    <Path d="M22.8571 22.8571H20.9524V24.7619H22.8571V22.8571Z" fill="#00AAFF"/>
                    <Path d="M24.7619 22.8571H22.8571V24.7619H24.7619V22.8571Z" fill="#00AAFF"/>
                    <Path d="M26.6667 22.8571H24.7619V24.7619H26.6667V22.8571Z" fill="#00AAFF"/>
                    <Path d="M34.2857 22.8571H32.381V24.7619H34.2857V22.8571Z" fill="#00AAFF"/>
                    <Path d="M36.1905 22.8571H34.2857V24.7619H36.1905V22.8571Z" fill="#00AAFF"/>
                    <Path d="M38.0952 22.8571H36.1905V24.7619H38.0952V22.8571Z" fill="#00AAFF"/>
                    <Path d="M40 22.8571H38.0952V24.7619H40V22.8571Z" fill="#00AAFF"/>
                    <Path d="M19.0476 24.7619H17.1429V26.6667H19.0476V24.7619Z" fill="#00AAFF"/>
                    <Path d="M22.8571 24.7619H20.9524V26.6667H22.8571V24.7619Z" fill="#00AAFF"/>
                    <Path d="M28.5714 24.7619H26.6667V26.6667H28.5714V24.7619Z" fill="#00AAFF"/>
                    <Path d="M32.381 24.7619H30.4762V26.6667H32.381V24.7619Z" fill="#00AAFF"/>
                    <Path d="M34.2857 24.7619H32.381V26.6667H34.2857V24.7619Z" fill="#00AAFF"/>
                    <Path d="M38.0952 24.7619H36.1905V26.6667H38.0952V24.7619Z" fill="#00AAFF"/>
                    <Path d="M1.90476 26.6667H0V28.5714H1.90476V26.6667Z" fill="#00AAFF"/>
                    <Path d="M3.80952 26.6667H1.90476V28.5714H3.80952V26.6667Z" fill="#00AAFF"/>
                    <Path d="M5.71429 26.6667H3.80952V28.5714H5.71429V26.6667Z" fill="#00AAFF"/>
                    <Path d="M7.61905 26.6667H5.71429V28.5714H7.61905V26.6667Z" fill="#00AAFF"/>
                    <Path d="M9.52381 26.6667H7.61905V28.5714H9.52381V26.6667Z" fill="#00AAFF"/>
                    <Path d="M11.4286 26.6667H9.52381V28.5714H11.4286V26.6667Z" fill="#00AAFF"/>
                    <Path d="M13.3333 26.6667H11.4286V28.5714H13.3333V26.6667Z" fill="#00AAFF"/>
                    <Path d="M17.1429 26.6667H15.2381V28.5714H17.1429L17.1429 26.6667Z" fill="#00AAFF"/>
                    <Path d="M19.0476 26.6667H17.1429L17.1429 28.5714H19.0476V26.6667Z" fill="#00AAFF"/>
                    <Path d="M20.9524 26.6667H19.0476V28.5714H20.9524V26.6667Z" fill="#00AAFF"/>
                    <Path d="M22.8571 26.6667H20.9524V28.5714H22.8571V26.6667Z" fill="#00AAFF"/>
                    <Path d="M34.2857 26.6667H32.381V28.5714H34.2857V26.6667Z" fill="#00AAFF"/>
                    <Path d="M36.1905 26.6667H34.2857V28.5714H36.1905V26.6667Z" fill="#00AAFF"/>
                    <Path d="M38.0952 26.6667H36.1905V28.5714H38.0952V26.6667Z" fill="#00AAFF"/>
                    <Path d="M1.90476 28.5714H0V30.4762H1.90476V28.5714Z" fill="#00AAFF"/>
                    <Path d="M13.3333 28.5714H11.4286V30.4762H13.3333V28.5714Z" fill="#00AAFF"/>
                    <Path d="M17.1429 28.5714H15.2381V30.4762H17.1429V28.5714Z" fill="#00AAFF"/>
                    <Path d="M19.0476 28.5714H17.1429V30.4762H19.0476V28.5714Z" fill="#00AAFF"/>
                    <Path d="M20.9524 28.5714H19.0476V30.4762H20.9524V28.5714Z" fill="#00AAFF"/>
                    <Path d="M26.6667 28.5714H24.7619V30.4762H26.6667V28.5714Z" fill="#00AAFF"/>
                    <Path d="M30.4762 28.5714H28.5714V30.4762H30.4762V28.5714Z" fill="#00AAFF"/>
                    <Path d="M34.2857 28.5714H32.381V30.4762H34.2857V28.5714Z" fill="#00AAFF"/>
                    <Path d="M1.90476 30.4762H0V32.381H1.90476V30.4762Z" fill="#00AAFF"/>
                    <Path d="M5.71429 30.4762H3.80952V32.381H5.71429V30.4762Z" fill="#00AAFF"/>
                    <Path d="M7.61905 30.4762H5.71429V32.381H7.61905V30.4762Z" fill="#00AAFF"/>
                    <Path d="M9.52381 30.4762H7.61905V32.381H9.52381V30.4762Z" fill="#00AAFF"/>
                    <Path d="M13.3333 30.4762H11.4286V32.381H13.3333V30.4762Z" fill="#00AAFF"/>
                    <Path d="M17.1429 30.4762H15.2381V32.381H17.1429V30.4762Z" fill="#00AAFF"/>
                    <Path d="M26.6667 30.4762H24.7619V32.381H26.6667V30.4762Z" fill="#00AAFF"/>
                    <Path d="M34.2857 30.4762H32.381V32.381H34.2857V30.4762Z" fill="#00AAFF"/>
                    <Path d="M38.0952 30.4762H36.1905V32.381H38.0952V30.4762Z" fill="#00AAFF"/>
                    <Path d="M40 30.4762H38.0952V32.381H40V30.4762Z" fill="#00AAFF"/>
                    <Path d="M1.90476 32.381H0V34.2857H1.90476V32.381Z" fill="#00AAFF"/>
                    <Path d="M5.71429 32.381H3.80952V34.2857H5.71429V32.381Z" fill="#00AAFF"/>
                    <Path d="M7.61905 32.381H5.71429V34.2857H7.61905V32.381Z" fill="#00AAFF"/>
                    <Path d="M9.52381 32.381H7.61905V34.2857H9.52381V32.381Z" fill="#00AAFF"/>
                    <Path d="M13.3333 32.381H11.4286V34.2857H13.3333V32.381Z" fill="#00AAFF"/>
                    <Path d="M17.1429 32.381H15.2381V34.2857H17.1429V32.381Z" fill="#00AAFF"/>
                    <Path d="M26.6667 32.381H24.7619V34.2857H26.6667V32.381Z" fill="#00AAFF"/>
                    <Path d="M28.5714 32.381H26.6667V34.2857H28.5714V32.381Z" fill="#00AAFF"/>
                    <Path d="M30.4762 32.381H28.5714V34.2857H30.4762V32.381Z" fill="#00AAFF"/>
                    <Path d="M36.1905 32.381H34.2857V34.2857H36.1905V32.381Z" fill="#00AAFF"/>
                    <Path d="M38.0952 32.381H36.1905V34.2857H38.0952V32.381Z" fill="#00AAFF"/>
                    <Path d="M1.90476 34.2857H0V36.1905H1.90476V34.2857Z" fill="#00AAFF"/>
                    <Path d="M5.71429 34.2857H3.80952V36.1905H5.71429V34.2857Z" fill="#00AAFF"/>
                    <Path d="M7.61905 34.2857H5.71429V36.1905H7.61905V34.2857Z" fill="#00AAFF"/>
                    <Path d="M9.52381 34.2857H7.61905V36.1905H9.52381V34.2857Z" fill="#00AAFF"/>
                    <Path d="M13.3333 34.2857H11.4286V36.1905H13.3333V34.2857Z" fill="#00AAFF"/>
                    <Path d="M17.1429 34.2857H15.2381V36.1905H17.1429V34.2857Z" fill="#00AAFF"/>
                    <Path d="M19.0476 34.2857H17.1429V36.1905H19.0476V34.2857Z" fill="#00AAFF"/>
                    <Path d="M22.8571 34.2857H20.9524V36.1905H22.8571V34.2857Z" fill="#00AAFF"/>
                    <Path d="M28.5714 34.2857H26.6667V36.1905H28.5714V34.2857Z" fill="#00AAFF"/>
                    <Path d="M30.4762 34.2857H28.5714V36.1905H30.4762V34.2857Z" fill="#00AAFF"/>
                    <Path d="M34.2857 34.2857H32.381V36.1905H34.2857V34.2857Z" fill="#00AAFF"/>
                    <Path d="M38.0952 34.2857H36.1905V36.1905H38.0952V34.2857Z" fill="#00AAFF"/>
                    <Path d="M1.90476 36.1905H0V38.0952H1.90476V36.1905Z" fill="#00AAFF"/>
                    <Path d="M13.3333 36.1905H11.4286V38.0952H13.3333V36.1905Z" fill="#00AAFF"/>
                    <Path d="M19.0476 36.1905H17.1429L17.1429 38.0952H19.0476V36.1905Z" fill="#00AAFF"/>
                    <Path d="M20.9524 36.1905H19.0476V38.0952H20.9524V36.1905Z" fill="#00AAFF"/>
                    <Path d="M22.8571 36.1905H20.9524V38.0952H22.8571V36.1905Z" fill="#00AAFF"/>
                    <Path d="M26.6667 36.1905H24.7619V38.0952H26.6667V36.1905Z" fill="#00AAFF"/>
                    <Path d="M28.5714 36.1905H26.6667V38.0952H28.5714V36.1905Z" fill="#00AAFF"/>
                    <Path d="M30.4762 36.1905H28.5714V38.0952H30.4762V36.1905Z" fill="#00AAFF"/>
                    <Path d="M32.381 36.1905H30.4762V38.0952H32.381V36.1905Z" fill="#00AAFF"/>
                    <Path d="M40 36.1905H38.0952V38.0952H40V36.1905Z" fill="#00AAFF"/>
                    <Path d="M1.90476 38.0952H0V40H1.90476V38.0952Z" fill="#00AAFF"/>
                    <Path d="M3.80952 38.0952H1.90476V40H3.80952V38.0952Z" fill="#00AAFF"/>
                    <Path d="M5.71429 38.0952H3.80952V40H5.71429V38.0952Z" fill="#00AAFF"/>
                    <Path d="M7.61905 38.0952H5.71429V40H7.61905V38.0952Z" fill="#00AAFF"/>
                    <Path d="M9.52381 38.0952H7.61905V40H9.52381V38.0952Z" fill="#00AAFF"/>
                    <Path d="M11.4286 38.0952H9.52381V40H11.4286V38.0952Z" fill="#00AAFF"/>
                    <Path d="M13.3333 38.0952H11.4286V40H13.3333V38.0952Z" fill="#00AAFF"/>
                    <Path d="M19.0476 38.0952H17.1429V40H19.0476V38.0952Z" fill="#00AAFF"/>
                    <Path d="M26.6667 38.0952H24.7619V40H26.6667V38.0952Z" fill="#00AAFF"/>
                    <Path d="M30.4762 38.0952H28.5714V40H30.4762V38.0952Z" fill="#00AAFF"/>
                </Svg>
            </View>
            <AppButton style={styles.btn} onPress={() => {
                LinkTo("ScannerScreen", navigation)
            }}>
                Сканирование
            </AppButton>
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

export const MainPageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ItemWrapper" component={ItemWrapper} />
        </Stack.Navigator>
    )
}