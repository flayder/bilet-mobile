import React from "react"
import {TouchableOpacity, View, Alert, Platform} from "react-native"
import {configurateState, GetRootNavigation} from "../global";
import { CommonActions } from '@react-navigation/native';
import { THEME } from "../theme";
import { StatusBar } from "expo-status-bar";
import AppHeaderMenuButtonLeftWrapper from "./ui/header/AppHeaderMenuButtonLeftWrapper";
import AppHeaderMenuButtonCenterWrapper from "./ui/header/AppHeaderMenuButtonCenterWrapper";
import AppHeaderMenuButtonRightWrapper from "./ui/header/AppHeaderMenuButtonRightWrapper";

const GLOBAL_HEADER_HEIGHT = Platform.OS == "android" ? 100 : 115

export const globalAlert = (
    {
        title = "",
        text,
        okButtonText = "Ok",
        cancelButtonText,
        cancelable = true,
        onOkFun,
        onCancelFun
    }) => {

    let cancel = {}
    const param = []

    if(cancelButtonText) {
        cancel = {
            text: cancelButtonText,
            style: "cancel",
            onPress: () => {
                if(onCancelFun) onCancelFun()
            }
        }
        param.push(cancel)
    }

    const okParam = {
        text: okButtonText, onPress: () => {
        if(onOkFun) onOkFun()
    } }

    param.push(okParam)

    Alert.alert(
        title,
        text,
        param,
        { cancelable: cancelable }
    )
}

const getDeepestParams = (state) => {
    let res = {}
    if(state && state.hasOwnProperty('state')) {
        if(state.state.hasOwnProperty('routes') && state.state.routes.length > 0) {
            let freshState = state.state.routes[0]
            if(freshState && freshState.hasOwnProperty('state')) {
                if(freshState.state.hasOwnProperty('routes') && freshState.state.routes.length > 0) {
                    freshState = freshState.state.routes[0]
                    if(freshState && freshState.hasOwnProperty('state')) {
                        if(freshState.state.hasOwnProperty('routes') && freshState.state.routes.length > 0) {
                            if(freshState.state.routes[0] && freshState.state.routes[0].hasOwnProperty('params') && freshState.state.routes[0].params !== undefined)
                                res = freshState.state.routes[0].params
                        }
                    }
                }
            }
        }
    }
    //console.log('route', res)
    return res
}

export const navigationBackHandler = (
    {
        routeName = "",
        navigation,
        route = "",
        jumpTo = false,
        position = 1
    }
    ) => {
    //console.log('route.params', route.params)
    // if(!routeName && !jumpTo)
    //     navigation.back()
    // else
    if(jumpTo)
        navigation.jumpTo(jumpTo)
    else {
        let isOk = false
        const nav = GetRootNavigation(navigation)
        nav.dispatch(state => {
            //console.log('nav', state.history)
            if(
                state &&
                state.hasOwnProperty('history') &&
                state.history.length > 0 &&
                state.history.splice(state.history.length - position, 1).length > 0
            ) {
                //console.log('previousState', params)
                const routePrevious = state.history[state.history.length - position]
                const previousState = state.routes[state.routes.length - position]
                let params = getDeepestParams(previousState)
                if(typeof routePrevious === "object" && routePrevious.hasOwnProperty('params')) {
                    params = routePrevious.params
                }
                //console.log('routePrevious', routePrevious)
                if(typeof routePrevious == "object") {
                    if(routePrevious.hasOwnProperty('key')) {
                        const routeSplit = routePrevious.key.split("-")
                        //console.log('routeSplit[0]', routeSplit[0])
                        if(routeSplit[0] != "") {
                            isOk = true
                            if(route.params === undefined) route.params = {}

                            const routes = configurateState(routeSplit[0], {
                                ...params,
                                ...route.params
                            }, state)
                            //console.log('routes', routes)
                            return CommonActions.reset({
                                ...state,
                                routes,
                                index: routes.length - 1,
                            });
                        }
                        //console.log('routeSplit', routeSplit)
                    }
                }
            }
            if(!isOk) {
                if(
                    route.params !== undefined &&
                    route.params.hasOwnProperty('previousRoute') &&
                    route.params.previousRoute != ""
                ) {
                    const newRoute = route.params
                    const routeName = newRoute.previousRoute
                    newRoute.previousRoute = ""

                    const routes = configurateState(routeName, routeName, state)
                    //console.log('routes1', routes)
                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    });
                } else {
                    const routes = configurateState(routeName, route.params, state)
                    //console.log('routes2', routes)
                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    });
                }
            }
        })

    }
}

export const NavigationBack = (
    {
        routeName = "",
        navigation,
        route = "",
        jumpTo = false,
        position = 1
    }) => {
    //console.log('some', routeName, route)
    return (
        <></>
    )
}

export const mainHeader = ({
        route,
        navigation,
        jumpTo,
        routeName,
        headerLeftBack,
        backgroundColor = THEME.BLACK,
        height = 100,
        paddingTop = 1,
        style
    }) => {
    
    return {
        //headerTintColor: '#000',
        tabBarStyle: {display: 'none'},
        headerLeft() {
            return <AppHeaderMenuButtonLeftWrapper 
                navigation={navigation} 
                route={route} 
            />
        },
        headerTitleContainerStyle: {
            width: "100%",
            backgroundColor: "transparent",
        },
        headerTitleAlign: "left",
        headerTitle(props) {
            return <AppHeaderMenuButtonCenterWrapper 
                navigation={navigation} 
                route={route} 
            />
        },
        headerRight() {
            return <AppHeaderMenuButtonRightWrapper 
                navigation={navigation} 
                route={route} 
            />
        },
        headerStyle: {
            height,
            backgroundColor,
            elevation: 0,
            ...style,
        }
    }
}