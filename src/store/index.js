import {createStore, combineReducers, applyMiddleware} from "redux"
import {createLogger} from 'redux-logger'
import thunk from "redux-thunk";
import { userReducer } from "./redusers/user";
import { bilet } from "./redusers/bilet";

const logger = createLogger({
    predicate(getState, action) {
        //console.log('action', action.type)
        return null
    },
    duration: false,
    diff: false,
    diffPredicate() {
        return null
    }
})

const rootReducer = combineReducers({
    user: userReducer,
    bilet,
})
//logger
export default createStore(rootReducer, applyMiddleware(thunk))