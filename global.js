import React, {useEffect} from "react"
import {Dimensions, Platform} from "react-native"
import {THEME} from "./theme";
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system"
//import RNFetchBlob from "rn-fetch-blob";
//import {globalAlert} from "./src/globalHeaders";

export const configurateState = (routeName, params, state) => {
    //console.log('ok', state)
    return [
        ...state.routes.slice(0, -1),
        {
            name: routeName ? routeName : "MainPageScreen",
            state: {
                routes: [
                    {
                        name: 'InsidePageScreen',
                        state: {
                            routes: [
                                {
                                    name: 'InsideTabs',
                                    state: {
                                        routes: [
                                            {
                                                name: "StackPageScreen",
                                                params: params
                                            }
                                        ]
                                    }

                                }
                            ]
                        },
                    },
                ],
            },
        },
        //state.routes[state.routes.length - 1],
    ];
}

export const GetRootNavigation = (navigation) => {
    let nav = navigation
    let i = 0
    while (nav !== undefined) {
        nav = nav.getParent()
        i++
    }

    let newNavigation = navigation

    for(let iter = 0; iter < i - 1; iter++) {
        newNavigation = newNavigation.getParent()
    }

    return newNavigation
}

export const LinkTo = (routeName, navigation, params = {}) => {
    
    const param = {
        ...params
    }

    param.hash = Date.now()

    navigation.navigate(routeName, {
        screen: "ItemWrapper",
        params: param
    })
}


export const validateDataOfPayment = (data, type) => {
    const resultData = {}
    if(data.hasOwnProperty('payments') && data.payments.hasOwnProperty(type)) {
        if (data.payments[type].hasOwnProperty('active')) {
            resultData.active = data.payments[type].active
        }
        if (data.payments[type].hasOwnProperty('till')) {
            resultData.till = data.payments[type].till
        }
        if (data.payments[type].hasOwnProperty('tariff_id')) {
            resultData.tariff_id = data.payments[type].tariff_id
        }
        if (data.payments[type].hasOwnProperty('price')) {
            resultData.price = data.payments[type].price
        }
        switch (type) {
            case 'seller':
                (data.hasOwnProperty('is_seller') && data.is_seller) ? resultData.main = true : resultData.main = false
                break
            case 'master':
                (data.hasOwnProperty('is_decorator') && data.is_decorator) ? resultData.main = true : resultData.main = false
                break
            case 'addition':
                (data.hasOwnProperty('is_addition') && data.is_addition) ? resultData.main = true : resultData.main = false
                break
            case 'partymaker':
                (data.hasOwnProperty('is_partymaker') && data.is_partymaker) ? resultData.main = true : resultData.main = false
                break
        }
    }

    return resultData
}

export const globalRouteFun = (route) => {
    // const dispatch = useDispatch()
    // const routeName = (typeof route === "object" && route.name) ? route.name : false
    // const globalRoute = useSelector(state => state.others.currentRoute)
    // //console.log('globalRouteglobalRoutes', globalRoute, routeName)
    // useEffect(() => {
    //     if(routeName && routeName != globalRoute) {
    //         dispatch(setCurrentRoute(route.name))
    //         //dispatch(setGlobalMessage(false))
    //     }
    // })
}

export const shopsStyles = {
    delivery: {
        paddingBottom: 30,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    viewerBtnText: {
        color: THEME.BLUE
    },
    viewerMap: {
        paddingRight: 10
    },
    viewerLink: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    sellerBlock: {
        width: "50%"
    },
    sellerInfo: {
        backgroundColor: THEME.FOOTER_BG,
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    sellerText: {
        marginTop: 0,
        marginBottom: 0,
        color: "#fff",
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 14
    },
    viewerCat: {
        marginTop: 0,
        marginBottom: 20,
        textAlign: "center"
    },
    viewerName: {
        marginTop: 20,
        marginBottom: 0,
        textAlign: "center"
    },
    ratingWrapText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: THEME.FOOTER_BG,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10
    },
    ratingBlockBtn: {
        width: "100%",
        height: 40,
        paddingRight: 10
    },
    btnText: {
        width: "100%",
        paddingLeft: 10,
        fontSize: 14
    },
    bottomPanel: {
        flexDirection: "row"
    },
    btn: {
        width: 125
    },
    votesText: {
        color: THEME.GREY_TEXT
    },
    textRatingItalic: {
        color: THEME.GREY_TEXT,
        paddingRight: 20
    },
    wrap: {
        width: "100%",
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: THEME.SLIDER_BG,
        ...SHADOW,
        paddingBottom: 0
    },
    charac: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    characBold: {
        paddingRight: 20,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14
    },
    characText: {
        marginTop: 3,
        marginBottom: 3,
        fontSize: 14
    },
    img: {
        width: 89,
        height: 100,
        //backgroundColor: "red"
    },
    price: {
        width: "100%",
        backgroundColor: THEME.FOOTER_BG,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10
    },
    priceTxt1: {
        width: "100%",
        marginTop: 2,
        marginBottom: 2,
        color: "#fff",
        fontSize: 14,
        textAlign: "center"
    },
    header: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    name: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 10,
        paddingRight: 25,
        textAlign: "center"
    },
    cat: {
        fontSize: 14,
        marginTop: 0,
        color: THEME.GREY_TEXT,
        textAlign: "center",
        paddingRight: 25
    },
    nameIcon: {
        position: "absolute",
        right: 25,
        top: 2
    },
    headerLeft: {
        position: "relative",
        paddingRight: 5
    },
    headerRight: {
        paddingLeft: 5
    },
    ratingBlock: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rating: {
        flexDirection: "row",
        alignItems: "center"
    },
    vote: {
        width: 120
    },
    description: {
        height: 71,
        overflow: "hidden"
    }
}

export const orderItem = {
    item: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        marginBottom: 5
    },
    centerName: {
        marginBottom: 0
    },
    orderBlockPrice: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 5
    },
    orderBlock: {
        flexDirection: "row",
        alignItems: "center"
    },
    amountCount: {
        textAlign: "center"
    },
    amount: {
        ...SHADOW_SMALL,
        backgroundColor: THEME.SLIDER_BG,
        borderRadius: 8,
        padding: 0,
        width: 100,
        justifyContent: "center"
    },
    wrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 1,
        borderColor: THEME.SLIDER_BG,
        ...SHADOW_SMALL
    },
    center: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    image: {
        width: 30,
        height: 30,
        //backgroundColor: "red"
    }
}

export const SCROLL_INITIATION_TO_PAGINATE = 350

export const notificationStyles = {
    subtitle: {
        marginTop: 5,
        marginBottom: 5
    },
    indicate: {
        width: 4,
        height: "80%",
        backgroundColor: "red",
        position: "absolute",
        left: 0,
        top: 15
    },
    checkbox: {
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        height: 100
    },
    name: {
        marginBottom: 5
    },
    messageBlockLeft: {
        paddingLeft: 20
    },
    messageLeft: {
        position: "relative",
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    avaWrap: {
        position: "relative",
        paddingLeft: 20
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        color: THEME.GREY_TEXT
    },
    ava: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    messageLeftText: {

    },
    messagerWrap: {
        // flexDirection: "row"
    },
    messageDateWrap: {

    },
    messageDate: {
        marginTop: 10,
        fontSize: 13,
        color: THEME.GREY,
    }
}

export const addToArrayOrRemove = (value, arr = []) => {
    if(arr.includes(value)) arr.splice(arr.indexOf(value), 1)
    else
        arr.push(value)

    return arr
}

export const getCalendarColor = (id) => {
    const colors = [
        {
            id: "1",
            color: "#286928"
        },
        {
            id: "2",
            color: "#7c956c"
        },
        {
            id: "3",
            color: "#b4b52a"
        },
        {
            id: "4",
            color: "#e17a0b"
        },
        {
            id: "5",
            color: "#ab2b23"
        },
        {
            id: "6",
            color: "#1f5d9d"
        },
        {
            id: "7",
            color: "#7b1b61"
        },
        {
            id: "8",
            color: "#2c3d22"
        }
    ]
    let res = "#fff"
    colors.map(item => {
        if(item.id == id) res = item.color
    })

    return res
}

export const getCalendarActiveColor = (id) => {
    const colors = [
        {
            id: "1",
            color: THEME.FOOTER_BG
        },
        {
            id: "2",
            color: "#7c956c"
        },
        {
            id: "3",
            color: "#b4b52a"
        },
        {
            id: "4",
            color: "#e17a0b"
        },
        {
            id: "5",
            color: "#ab2b23"
        },
        {
            id: "6",
            color: "#1f5d9d"
        },
        {
            id: "7",
            color: "#7b1b61"
        },
        {
            id: "8",
            color: "#2c3d22"
        }
    ]
    let res = "#fff"
    colors.map(item => {
        if(item.id == id) res = item.color
    })

    return res
}

export const getCalendarMatch = (year, id) => {
    let result = false
    if(year && id) {
        for(let $id in year) {
            if(year[$id] == id && !result) result = year[$id]
        }
    }

    return result
}

export const SharingFile = async (url) => {
    const filename = GetFileName(url, true)
    const downloadPath = FileSystem.cacheDirectory + filename;
    const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);
    if(Platform.OS !== "android") {
        const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);
        const UTI = 'public.item'
        await Sharing.shareAsync(localUrl, {UTI})
    } else {
        await Sharing.shareAsync(localUrl)
    }
}

export const ToDownloadFile = async (url, img = false) => {
    return null
    
    let dirs = RNFetchBlob.fs.dirs
    const filename = GetFileName(url, true)
    try {
        const res = await RNFetchBlob
        .config({
            fileCache : true,
            path: dirs.DocumentDir + filename
        })
        .fetch('GET', url)

        globalAlert({
            title: `Файл ${filename} был успешно скачан`,
            text: `Файл скачан в ${res.path()}`,
            okButtonText: "Поделится файлом",
            async onOkFun() {
                const downloadPath = FileSystem.cacheDirectory + filename;
                const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);
                if(Platform.OS === "ios") {
                    const UTI = 'public.item'
                    await Sharing.shareAsync(localUrl, {UTI})
                } else {
                    await Sharing.shareAsync(localUrl)
                }
            },
            cancelButtonText: "Не делится файлом"
        })
    } catch (errorMessage) {
        globalAlert({
            title: errorMessage
        })
    }

    // if(img) {
    //     const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    //     if (perm.status != 'granted') {
    //         return;
    //     }
    // }
    //
    // const filename = GetFileName(url, true)
    // const downloadPath = FileSystem.cacheDirectory + filename;
    // const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);
    // if(img) {
    //     try {
    //         const asset = await MediaLibrary.createAssetAsync(localUrl);
    //         const album = await MediaLibrary.getAlbumAsync('Clever Dacha');
    //         if (album == null) {
    //             await MediaLibrary.createAlbumAsync('Clever Dacha', asset, false);
    //         } else {
    //             await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    //         }
    //         globalAlert({
    //             title: `Изображение ${filename} было успешно скачано`
    //         })
    //     } catch (e) {
    //         globalAlert({
    //             title: e
    //         })
    //     }
    // } else {
    //
    //
    //
    // }

    return Promise.resolve(true)
}

export const GLOBAL_NOT_ADDING_TARRIF_TITLE = "Функционал недоступен"
export const GLOBAL_NOT_ADDING_TARRIF = "Для разблокирования функционала приобрите его в профиле пользователя"

//pushing
export const GLOBAL_PUSHING = "globalPushNotice"
export const PUSHING_DEFAULT_CHANNEL_ID = "default-channel-id"
export const PUSHING_SOUND_CHANNEL_ID = "sound-channel-id"

//favorites
export const FAVORITE_SORT = "sort"
export const FAVORITE_SELLER = "seller"
export const FAVORITE_PEST = "pest"
export const FAVORITE_DECORATOR = "decorator"
export const FAVORITE_CHEMICAL = "chemical"
export const FAVORITE_QUESTION = "question"
export const FAVORITE_EVENT = "event"
export const FAVORITE_DISEASE = "disease"

//type of sort sections
export const SAD = "sad"
export const OGOROD = "ogorod"
export const KLUMBA = "klumba"

//type of data
export const SORTS = "sorts"
export const PESTS = "pests"
export const DISEASES = "diseases"
export const NOTE = "note"
export const CHEMICAL = "chemical"
export const MASTER = "decorator"

export const SORTBYNAME = "name"
export const SORTBYREYT = "reyt"
export const SORTBYPOPULAR = "popular"
export const SORTBYAVAILABLE = "available"

export const SHOPBYNAME = "name"
export const SHOPBYREYT = "reyt"
export const SHOPBYPRICE = "price"


export const MASTERBYNAME = "first_name"
export const MASTERBYREYT = "reyt"
export const MASTERBYPRICE = "price"

export const GOOGLE_API_KEY = "AIzaSyBzTnVdchhgS0vrQyiqnSvJcOLuc9d0egc"

export const EXHIB = "exhibitations"
export const FEST = "fastivals"
export const FAIRS = "fairs"
export const NEWS = "news"
export const OTHERS = "others"

export const Months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]

export const findABreak = (text) => {
    let index = 0
    for(let i = text.length; i >= 0; i--) {
        if(text[i] === " ") {
            index = i
            break
        }
    }
    return index
}


export const parseSpecialistFilter = (data) => {
    let response = []
    if(typeof data == "object" && data.hasOwnProperty('attributes') && Array.isArray(data.attributes)) {
        data.attributes.map(item => {
            response.push({
                name: item.name,
                value: item.id
            })
        })
    }

    return response
}

export const getColorType = (type) => {
    let color
    switch (type) {
        case SAD:
            color = THEME.SAD_COLOR
            break
        case OGOROD:
            color = THEME.OGOROD_COLOR
            break
        case KLUMBA:
            color = THEME.KLUMBA_COLOR
            break
    }
    return color
}

export const isOrientation = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width ? 'portrait' : 'landscape'
}

export const getSortType = (id) => {
    switch (id) {
        case 6:
            return SAD
        case 5:
            return OGOROD
        case 4:
            return KLUMBA
    }

    return ""
}

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomKey = () => {
    const num =  getRandomInt(0, 100000000000000000000000000000)
    const num2 = getRandomInt(0, 999999999999999999999999999999)
    const num3 = getRandomInt(0, 5000)
    const num4 = getRandomInt(0, 15000)
    const num5 = getRandomInt(0, 25000)
    const num6 = getRandomInt(0, 35000)
    return num + num2 - num3 - num4 - num5 - num6
    //return Random.getRandomBytes(getRandomInt(1, 1023))
}

export const getSelectTitle = (data, value) => {
    let title = ""

    data.map(item => {
        if(item.value == value) title = item.name
    })

    //console.log('data, value', data, value, title)

    return title
}

export const makeFileObject = (path) => {
    return {
        uri: path,
        name: false,
        native: true
    }
}

export const emptyNavigation = {
    shadowOpacity: 0,
    elevation: 0,
    boxShadow:'',
    backgroundColor: '#fff'
}

export const ifItExist = (arr, item) => {
    if(!Array.isArray(arr)) return false
    let found = false
    arr.map(value => {
        if(value == item) found = true
    })

    return found
}

export const ifProductIdExist = (products, productId) => {
    if(!Array.isArray(products)) return false
    let exist = false
    products.map(product => {
        if(typeof product == "object" && product.hasOwnProperty('productId') && productId == product.productId) exist = true
    })

    return exist
}

export const GLOBAL_CONST = {
    emailValidation: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
}

export const SHADOW = {
    shadowRadius: 5,
    padding: 5,
    shadowOpacity: .1,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5
    },
    elevation: 7
}

export const SHADOW_SMALL = {
    elevation: 4,
    shadowOffset: {
        width: 1,
        height: 3
    },
    shadowRadius: 3,
    shadowOpacity: .2,
    shadowColor: "#000"
}

export const FAVORITE_ITEM_STYLE = {
    body: {
        paddingLeft: 10,
        paddingRight: 10
    },
    name: {
        fontSize: 16,
        marginTop: 0,
        marginBottom: 0
    },
    descr: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0,
        color: THEME.GREY_TEXT
    },
    num: {
        width: 40,
        textAlign: "center"
    },
    wrap: {
        paddingTop: 4,
        paddingBottom: 4,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: THEME.ALL_COLOR
    },
    drug: {
        marginBottom: 10
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
}


export const FileHandler = (data) => {
    //console.log('fileHandler', data)
    if(
        !data.hasOwnProperty('uri') ||
        !data.hasOwnProperty('type') ||
        !data.type
    ) return false
    const arrOfEverything = data.uri.split("/")
    const nameWithFormat = arrOfEverything[arrOfEverything.length - 1].split(".")
    //console.log('nameWithFormat', nameWithFormat)
    const type = `image/${nameWithFormat[nameWithFormat.length - 1]}`;

    return {
        uri: data.uri,
        name: arrOfEverything[arrOfEverything.length - 1],
        type
    }
}

export const getBackHandle = (navigation) => {
    try {
        let route = ""
        let params = {}
        const mainState = navigation.getParent().getParent().getParent().getState()
        if(mainState.hasOwnProperty('history')) {
            const lastElement = mainState.history[mainState.history.length - 2]
            if(typeof lastElement == "object" && lastElement.hasOwnProperty('key')) {
                //console.log('lastElement', lastElement)
                let arrKey = lastElement.key.split("-")
                //console.log('lastElement', arrKey)
                route = arrKey[0]

                if(lastElement.params) {
                    params = lastElement.params
                }

                return {
                    routeName: route,
                    params
                }
            }
        }
    } catch (e) {console.log('tryingGetStateError', e)}
    return false
}

export const GetFileName = (url, expresion = false) => {
    const arr = new String(url).split("/")
    if(arr.length > 0) {
        const name = arr[arr.length - 1]
        if(!expresion) {
            const arrName = new String(name).split(".")
            return arrName[0]
        } else
            return name
    }

    return ""
}

export const masterAssortmentStyle = {
    textBtn: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 13
    },
    block: {
        //marginTop: -20,
        //marginBottom: -20
    },
    title: {
        marginTop: 0,
        color: THEME.FOOTER_BG
    },
    wrap: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20
    },
    counterBlock: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoBlock: {
        paddingLeft: 20
    },
    zoomBg: {
        backgroundColor: "#000",
        opacity: .5,
        width: 45,
        height: 45,
        position: "absolute",
        left: 0,
        top: 0
    },
    zoomWrap: {
        position: "relative",
        padding: 10
    },
    zoom: {
        position: "absolute",
        left: 0,
        bottom: 0
    },
    imageBlock: {
        width: 120,
        position: "relative"
    },
    img: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0
    },
    descrBlock: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    descr: {
        marginTop: 0,
        marginBottom: 0,
        maxHeight: 54,
        fontSize: 14
    }
}

export const PROFILE_STYLE = {
    wrap: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row"
    },
    photo: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 9
    },
    left: {
        position: "relative",
        width: "40%",
        minHeight: 120
        //backgroundColor: "red"
    },
    right: {
        width: "60%",
        paddingLeft: 20,
        marginTop: -10,
        marginBottom: -10
    },
    line: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon : {
        paddingRight: 10
    },
    text: {
        marginTop: 10,
        marginBottom: 10
    }
}

export const orderItemsStyles = {
    order: {},
    btnBlue: {
        width: 120,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        marginBottom: 20
    },
    totalTextPrice: {
        fontSize: 20
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    messageBtnText: {
        paddingLeft: 10,
        color: THEME.BLUE
    },
    messageBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    borderTop: {
        borderTopWidth: 1,
        borderColor: THEME.GREY,
        marginLeft: -40,
        marginRight: -40,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        paddingTop: 10
    },
    input: {
        borderColor: THEME.BLUE
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    blockArrow: {
        paddingLeft: 10,
        position: "relative",
        height: 12,
        top: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    textBlock: {
        textAlign: "center"
    },
    grey: {
        marginLeft: -20,
        marginRight: -20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: THEME.SLIDER_BG
    },
    orderTitle: {
        textAlign: "center",
        marginBottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    opened: {
        marginLeft: -20,
        marginRight: -20
    },
    status: {
        justifyContent: "center"
    },
    statusText: {
        textAlign: "center",
        color: THEME.CHEMICAL_COLOR
    },
    newCheckbox: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingRight: 20,
        paddingTop: 20
    },


    //another styles
    contact: {
        borderTopWidth: 2,
        borderColor: THEME.ALL_COLOR,
        paddingTop: 10,
        marginTop: 10
    },
    phoneCall: {
        justifyContent: "center",
        alignItems: "center",
    },
    phoneCallText: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 0
    },
    phoneCallBlock: {
        width: 220,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    phone: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    phoneText: {
        paddingLeft: 10
    },
    radioBlock: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioBlockText: {
        paddingLeft: 5,
        marginTop: 5,
        marginBottom: 5
    }
}

export const PRODUCT_STYLE = {
    price: {
        width: 80,
        borderWidth: 1,
        borderStyle: "solid",
        justifyContent: "center",
        alignItems: "center",
        height: 25,
        padding: 3,
        marginTop: 5,
        marginBottom: 0,
        borderRadius: 4,
    },
    priceText: {
        color: THEME.GREY_SMOKE,
        fontSize: 11,
        textAlign: "center",
        marginTop: 1,
        marginBottom: 0
    },
    name: {
        fontSize: 13,
        height: 20,
        marginTop: 0,
        marginBottom: 0
    },
    nameWrap: {
        position: "absolute",
        top: 0,
        right: 0,
        justifyContent: "center",
        width: "60%",
        height: "100%"
    },
    rightWrap: {
        ...SHADOW,
        padding: 10,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "transparent"
    },
    descr: {
        marginTop: 5,
        marginBottom: 0,
        color: THEME.GREY_TEXT,
        height: 30
    },
    item: {
        flexDirection: "row",
        marginRight: 10,
        height: 110
    },
    imgWrap: {
        height: "100%",
        borderRadius: 6
    },
    photo: {
        borderRadius: 6,
        overflow: "hidden",
        width: 100,
        height: 110
    },
    btnWrap: {
        //borderRadius: 6
    },
    middleText: {
        marginTop: 0,
        marginBottom: 0,
        color: THEME.GREY,
        fontSize: 12
    }
}

export const PESTS_STYLE = {
    pestWrap: {
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden",
        height: 120,
        backgroundColor: THEME.SLIDER_BG,
        marginBottom: 20
    },
    pestImg: {
        width: 70,
        height: "100%"
    },
    pestContent: {
        paddingLeft: 10
    },
    pestTitle: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        height: 35,
        paddingRight: 110
    },
    pestTitleText: {
        marginTop: 0,
        marginBottom: 0,
        height: 27
    },
    pestText: {
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 5
    },
    pestDescr: {
        marginTop: 0,
        marginBottom: 0,
        height: 70
    },
    pestBtn: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 100,
        height: 35
    }
}