import {combineReducers} from 'redux'
import searchBoxReducer from './searchBox'
import authReducer from './authReducer'
import cartReducer from './cartReducer'

export default combineReducers({
    auth : authReducer,
    searchbox: searchBoxReducer,
    cart: cartReducer
})