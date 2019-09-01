import {combineReducers} from 'redux'
import userReducer from './users'
import searchBoxReducer from './users'

export default combineReducers({
    user : userReducer,
    searchbox: searchBoxReducer
})