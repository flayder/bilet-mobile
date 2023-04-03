import {CHECK_BILET, ITEMS_LIST, ITEMS_LISTS, ITEM_DETAIL, SEARCH_INPUT} from "../types";

const initialState = {
    scanned_checkout: {},
    search: '',
    items: [],
    list: [],
    detail: {}
}

export const bilet = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_BILET: return {
            ...state,
            scanned_checkout: action.payload
        }
        case SEARCH_INPUT: return {
            ...state,
            search: action.payload
        }
        case ITEMS_LIST: return {
            ...state,
            items: action.payload
        }
        case ITEMS_LISTS: return {
            ...state,
            list: action.payload
        }
        case ITEM_DETAIL: return {
            ...state,
            detail: action.payload
        }
        default: return state
    }
}