import {GET_CURRENT_USER} from "../types";
import { DB } from "../../db";
import {AppFetch} from "../../AppFetch";
import { LinkTo } from "../../../global";
//export const

export const getCurrentUser = ({navigation, force = false}) => {
    return async (dispatch, getState) => {
        const currentUser = getState().user.currentUser
        let user = false
        //console.log('state', getState())

        if(!force && currentUser && typeof currentUser == "object" && currentUser.hasOwnProperty('id')) { 
            user = currentUser
        } else {
            const response = await AppFetch.getWithToken({url: "/userchecker/current_user/"})
            if(response.status == 200) {
                if(response.results && typeof response.results == "object" && response.results.hasOwnProperty('id')) {
                    user = response.results
                }
            }
        }

        if(!user) {
            const dbUser = await DB.getUser()
            if(dbUser && typeof dbUser == "object" && dbUser.token) {
                user = {token: dbUser.token}
            } else {
                LinkTo("SignInScreen", {}, navigation)
            }
        }

        dispatch({
            type: GET_CURRENT_USER,
            payload: user
        })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({
            type: GET_CURRENT_USER,
            payload: {}
        })
    }
}