import {
    ADD_TO_CARD,
    ADD_ON_LOGOUT
 } from '../Action/type'

 const INITIAL_STATE = {
    cart: [],
    cartCount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_CARD: 
        return {...state,...action.payload}
        case ADD_ON_LOGOUT:
            return { INITIAL_STATE}
        default :
        return state
    }
}