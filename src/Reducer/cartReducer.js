import {
    ADD_TO_CARD
 } from '../Action/type'

 const INITIAL_STATE = {
    cart: [],
    cartCount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_CARD: 
        return {...INITIAL_STATE,...action.payload}
        default :
        return state
    }
}