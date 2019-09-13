import {
    AUTH_LOADING,
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    USER_LOGOUT
}
 from '../Action/type'

const INITIAL_STATE = {
    username : '',
    email : '',
    statusid : null,
    password:'',
    error : '',
    token : '',
    roleid: null,
    authChecked : false,
    loading : false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            console.log(state.roleId)
            return {...INITIAL_STATE, ...action.payload, authChecked : true}
        case AUTH_SYSTEM_ERROR: 
            return {...INITIAL_STATE,error: action.payload, authChecked : true}
        case AUTH_LOADING :
            return {...state, error : '', loading : true}
        case USER_LOGOUT :
            return {...INITIAL_STATE,authChecked: true}
        default :
        return state
    }
}