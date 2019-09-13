import {combineReducers} from 'redux'
import searchBoxReducer from './searchBox'
import authReducer from './authReducer'

export default combineReducers({
    auth : authReducer,
    searchbox: searchBoxReducer
})