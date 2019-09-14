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
                'Authorization' : `Bearer ${token}`
            }
        }

        Axios.post(`${API_URL}/cart/getcart`,{}, headers)
        .then((res) => {
            console.log(res.data)
            let object = {
                    cart: res.data.cartUser,
                    cartCount: res.data.cartCount
            }
            dispatch({ type: ADD_TO_CARD, payload: object})
        })
        .catch((err) => {
            console.log(err)
            
        })
        }
    }