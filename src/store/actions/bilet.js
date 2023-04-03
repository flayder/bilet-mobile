import {CHECK_BILET, ITEMS_LIST, ITEMS_LISTS, ITEM_DETAIL, SEARCH_INPUT, SET_CURRENT_BILET} from "../types";
import {AppFetch} from "../../AppFetch";
//export const

export const checkBilet = (bilet) => {
    return async (dispatch, getState) => {
        // let bilet = false
        // const data = new FormData
        // data.append('qr', qr)
        // const response = await AppFetch.postWithToken("/userchecker/check_bilet/", data)

        // if(response.status == 200) {
        //     bilet = response.results
        // }

        dispatch({
            type: CHECK_BILET,
            payload: bilet
        })
    }
}


export const setSearchInput = (search) => {
    return async (dispatch) => {
        dispatch({
            type: SEARCH_INPUT,
            payload: search
        })
    }
}


export const getDataList = (event_id = false, clear = false) => {
    return async (dispatch, getState) => {
        const params = {}
        let items = []

        if(!clear) {
            const search = getState().bilet.search
            params.search = search
        }

        if(event_id > 0) {
            params.event = event_id
        }

        //console.log('params', params)

        const response = await AppFetch.getWithToken({url: "/userchecker/checkout/", params})

        if(response.status == 200 && Array.isArray(response.results)) {
            items = response.results
        }

        dispatch({
            type: ITEMS_LIST,
            payload: items
        })
    }
}

export const getDataLists = (event_id) => {
    return async (dispatch, getState) => {
        const params = {}
        let items = []

        if(event_id > 0) {
            params.event = event_id
            const response = await AppFetch.getWithToken({url: "/userchecker/checkout/", params})

            if(response.status == 200 && Array.isArray(response.results)) {
                items = response.results
            }
        }

        //console.log('params', params)

        

        dispatch({
            type: ITEMS_LISTS,
            payload: items
        })
    }
}

export const getDetailData = (id, params = {}) => {
    return async (dispatch, getState) => {
        let items = getState().bilet.items
        let list = getState().bilet.list
        let detail = {}

        let getFromState = items.filter(i => i.id == id)

        if(getFromState.length == 0) {
            getFromState = list.filter(i => i.id == id)
        }
        
        if(getFromState.length == 0) {
            const response = await AppFetch.getWithToken({url: `/userchecker/checkout/${id}/`, params})
            if(response.status == 200 && response.results) {
                detail = response.results
            }
        } else {
           detail = getFromState[0]
        }

        //console.log('detail', detail)

        dispatch({
            type: ITEM_DETAIL,
            payload: detail
        })
    }
}