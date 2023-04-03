import {DB} from "./db";
import React from "react"
import {Platform} from "react-native";
//import RNFetchBlob from "rn-fetch-blob";
import {GetFileName, LinkTo} from "../global";

export class AppFetch {
    //static url = `http://${Platform.OS == "android" ? '10.0.2.2' : '127.0.0.1'}:8000/api`
    static url = `https://bilet-tut.ru:3001/api`
    static errors = []

    static logOut = async () => {
        const user = await DB.getUser()
        await DB.update({
            table_name: "user",
            names: ["login", "password", "token"],
            values: ["", "", ""],
            where: `id = ${user.id}`
        })
        //await DB.createOrUpdate("appPushToken", "")
        //navigation.navigate("SignInScreen")
        //navigation.navigate('AuthorizationScreen', )
    }

    static async errorResponsePromise(response) {
        //console.log('errorResponsePromiseResponse', response)
        try {
            //const error = await response.text()
            return Promise.resolve({
                result: false,
                data: response
            })
        } catch(e) {
            //console.log('errorInsideErrorResponse', e)
        }

        return Promise.resolve({
            return: false,
            data: false
        })
    }

    static errorResponse(error) {
        //console.log(error)
        return {
            result: false,
            data: error
        }
    }

    static addTokenToParams(params, token) {
        const newParams = params
        newParams.token = token

        return newParams
    }

    static errorConfigurate(json, init = false) {
        if(init) {
            this.errors = []
        }
        if(json) {
            if(Array.isArray(json)) {
                json.map(item => {
                    this.errorConfigurate(item)
                })
            } else if(typeof json == "object") {
                for(let item in json) {
                    this.errorConfigurate(json[item])
                }
            } else if(typeof json == "string") {
                this.errors.push(json)
            }
        }
    }

    static async tryingToRetakeToken(json, url, params, headers, navigation) {
        //console.log(url, json.status)
        if(json.status === 405) {
            //
            // const user = await DB.getUser()
            // if(
            //     typeof user == "object" &&
            //     user.hasOwnProperty('id') &&
            //     user.id &&
            //     user.hasOwnProperty('email') &&
            //     user.email &&
            //     user.hasOwnProperty('password') &&
            //     user.password
            // ) {
            //     const getToken = await AppFetch.get("getUserToken", {email: user.email, password: user.password})
            //     if(getToken.hasOwnProperty('token') && getToken.token) {
            //         await DB.update({
            //             table_name: "user",
            //             names: ["token"],
            //             values: [getToken.token],
            //             where: `id = ${user.id}`
            //         })

            //         json = await AppFetch.getWithToken(url, AppFetch.addTokenToParams(params, getToken.token), headers, navigation)
            //     } else
            //         await AppFetch.logOut(navigation)
            // } else
            //     await AppFetch.logOut(navigation)
        }

        return Promise.resolve(json)
    }

    static parseFormData = (data) => {
        let arr = []
        if(data.hasOwnProperty('_parts') && Array.isArray(data._parts)) {
            for(let i = 0; i < data._parts.length; i++) {
                if(Array.isArray(data._parts[i]) && data._parts[i].length >= 2) {
                    let d = data._parts[i]
                    if(typeof d[1] == "object" && d[1].hasOwnProperty("uri")) {
                        const file = GetFileName(d[1].uri, true)
                        const fileArr = file.split(".")
                        arr.push({
                            name: d[0],
                            filename: file,
                            type:'image/' + fileArr[fileArr.length - 1],
                            data: RNFetchBlob.wrap(d[1].uri)
                        })
                    } else if(typeof d[1] == "object") {
                        arr.push({
                            name: d[0],
                            data: JSON.stringify(d[1])
                        })
                    } else {
                        arr.push({
                            name: d[0],
                            data: ""+d[1]
                        })
                    }
                }
            }
        } else {
            arr = data
        }

        //console.log('postParam', arr)
        return arr
    }

    static parseJson(text) {

    }

    static async tryingToFindErrors(response) {
        let cloneResponse = JSON.stringify(response)
        //console.log('responseClone', cloneResponse)
        let text = await response.text()
        //onsole.log('text', text.substr(0, 1000))
        //console.log('text', text)
        let json = JSON.parse(text)
        //json = JSON.parse(json)
        cloneResponse = JSON.parse(cloneResponse)
        const status = cloneResponse.status

        if(status !== 200) {
            this.errorConfigurate(json, true)
            json.errors = this.errors
        }

        json.status = status ?? 404
        return Promise.resolve(json)
    }

    static async getTokenHead(header = {}) {
        const head = {}
        let headers
        const user = await DB.getUser()
        if(user.hasOwnProperty('token')) 
            head.Authorization = `Token ${user.token}`

        if(header && typeof header == "object") {
            headers = {
                ...head,
                ...header
            }
        } else {
            headers = head
        }

        return Promise.resolve(headers)
    }

    static async get(url, params = {}, headers = {"Content-Type": "application/json"}) {
        console.log('GET AppFetch.url + url + "?" + new URLSearchParams(params)', AppFetch.url + url + "?" + new URLSearchParams(params))
        try {
            const response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
                method: "GET",
                body: null,
                headers: headers
            })
            return await AppFetch.tryingToFindErrors(response)
        } catch (error) {
            return await AppFetch.errorResponsePromise(error)
        }
        //return Promise
    }

    static async getWithToken({url, params, headers, navigation}) {
        //console.log('canGoBack', navigation.canGoBack())
        if(navigation)
            navigation.canGoBack()

        headers = await AppFetch.getTokenHead(headers)

        let param = {}

        if(params && typeof params == "object") {
            param = params
        }

        return AppFetch.get(url, param, headers)
    }

    static async post(url, body = {}, params = {}, headers = {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
    }) {
        //console.log('POST url + "?" + new URLSearchParams(params)', url + "?" + new URLSearchParams(params))
        try {
            let response
            response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
                method: "POST",
                body: body,
                headers: headers
            })
            // if(Platform.OS != "android")
            //     response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
            //         method: "POST",
            //         body: body,
            //         headers: headers
            //     })
            // else {
            //     //RNFetchBlob
            //     response = await fetch('POST', AppFetch.url + url + "?" + new URLSearchParams(params), headers, AppFetch.parseFormData(body))
            // }
            return await AppFetch.tryingToFindErrors(response)
        } catch (error) {
            //console.log('error', error)
            return await AppFetch.errorResponsePromise(error)
        }
    }

    static async postWithToken({url, body, params, headers, navigation}) {
        //console.log('canGoBack', navigation.canGoBack())
        if(navigation)
            navigation.canGoBack()

        headers = await AppFetch.getTokenHead(headers)
        headers.Accept = "application/json"
        headers["Content-Type"] = "multipart/form-data"

        let param = {}

        if(params && typeof params == "object") {
            param = params
        }
        
        return AppFetch.post(url, body, param, headers)
    }

    static async putWithToken({url, body, params, headers, navigation}) {
        //console.log('canGoBack', navigation.canGoBack())
        if(navigation)
            navigation.canGoBack()

        headers = await AppFetch.getTokenHead(headers)
        headers.Accept = "application/json"

        let param = {}

        if(params && typeof params == "object") {
            param = params
        }
        
        try {
            let response
            response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
                method: "PUT",
                body: body,
                headers: headers
            })
            // if(Platform.OS != "android")
            //     response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
            //         method: "POST",
            //         body: body,
            //         headers: headers
            //     })
            // else {
            //     //RNFetchBlob
            //     response = await fetch('POST', AppFetch.url + url + "?" + new URLSearchParams(params), headers, AppFetch.parseFormData(body))
            // }
            return await AppFetch.tryingToFindErrors(response)
        } catch (error) {
            //console.log('error', error)
            return await AppFetch.errorResponsePromise(error)
        }
    }
}