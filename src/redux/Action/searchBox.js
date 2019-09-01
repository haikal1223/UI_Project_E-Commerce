import axios from 'axios'
import {SEARCH_BOX_DATA} from '../Action/type'
import { API_URL } from '../../API_URL';

export const onSearchBox = (data) => {
    return (dispatch) => {
        axios.get(API_URL + `/search/getsearched?search=${data}`)
        .then((res) => {
            dispatch({type: SEARCH_BOX_DATA, payload: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
}