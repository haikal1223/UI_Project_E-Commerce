const INITIAL_STATE = {id : 0, username : '', password : ''}

export default (state = INITIAL_STATE, action) => {
    if(action.type === 'LOGIN_SUCCESS'){
        return action.payload
    }else if(action.type === 'LOG_OUT'){
        return INITIAL_STATE
    }else{
        return state
    }
}