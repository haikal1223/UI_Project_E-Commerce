import {
ADD_LOADING,
ADD_TO_PAYMENT_SUCCESS,
ADD_TO_PAYMENT_FAIL
} from '../Action/type'

const INITIAL_STATE = {
    username: '',
    recipient: '',
    phone: '',
    addres: '',
    city:'',
    zip: 0,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_PAYMENT_SUCCESS:
            return {...INITIAL_STATE, ...action.payload}
        case ADD_TO_PAYMENT_FAIL:
            return {...INITIAL_STATE, error:action.payload}
        case ADD_LOADING:
            return {

            }
        default:
            return state
    }
}