import {
    ADD_TO_CARD
} from './type'
import Axios from 'axios';
import { API_URL } from '../API_URL';



export const onBtnAddToCart = (object) => {
    return{
        type:ADD_TO_CARD,
        payload: object
    }
};

export const showCartUser = () => {
    return(dispatch) => {
         const token = localStorage.getItem('username')
            
         const headers = {
            headers:{
                'Authorization' : ` ${token}`
            }
        }

        Axios.get(`${API_URL}/cart/getcart`,headers)
        .then((res) => {
            console.log(res.data)
            let object = {
                
            }
            dispatch({ type: ADD_TO_CARD, payload: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
        }
    }