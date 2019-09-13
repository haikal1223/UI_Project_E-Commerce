import Axios from 'axios'
import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    AUTH_LOADING,
    USER_LOGOUT
} from './type'
import { API_URL } from '../API_URL';


export const onUserRegister = ({ username, email, password }) => {
    return (dispatch) => {
        dispatch({ type:AUTH_LOADING })
        if(username === '' || password === '' || email === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'All Forms Must be Filled!'})
        }else{
            Axios.post(API_URL + '/user/register', {
                username,email,password
            })
            .then((res) => {
                console.log(res.data)
                if(res.data.status === 'error') {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message})
                }else{
                    localStorage.setItem('username',username)
                    dispatch({type: USER_LOGIN_SUCCESS, payload: {
                        username: res.data.username,
                        email: res.data.email,
                        password: res.data.password
                    }})
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
        }
    }
}

export const onUserLogin = ({ username,password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            Axios.post(API_URL + '/user/login', {
                username, password
            }).then((res) => {
                console.log(res)
                if(res.data.status !== 'error'){
                    console.log(res.data.token);
                    localStorage.setItem('username',res.data.token)
                    dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })  
                }else{
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message })
                }
            }).catch((err) => {
                console.log(err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
            })        
        }
    }
}

export const keepLogin = () => {
    return(dispatch) =>{
        const token = localStorage.getItem('username')
        console.log('keeplogin')
        console.log(token);
        
        const headers = {
            headers:{
                'Authorization' : ` ${token}`
            }
        }
        Axios.post(API_URL + '/user/keeplogin',{},headers)
        .then((res)=>{
            
            localStorage.setItem('username',res.data.token)
            dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
        }).catch((err)=>{
            console.log(err.response);
            localStorage.removeItem('username')
            dispatch({ type : USER_LOGOUT})
        })
    }
}

export const onUserLogOut = () => {
    localStorage.removeItem('username')
    return {
        type : USER_LOGOUT
    }
}