export const OnRegisterSuccess = (data) =>{
    return{
        type : 'LOGIN_SUCCESS',
        payload : data
    }
}

export const onLogOut = () =>{
    return{
        type: 'LOG_OUT'
    }
}