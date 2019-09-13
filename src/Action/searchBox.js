import {SEARCH_BOX_DATA, SEARCH_BOX_FALSE} from '../Action/type'

export const onSearchBox = (data) => {
    return {
        type: SEARCH_BOX_DATA,
        payload: data
    }   
}

export const onSearchBoxFalse = () => {
    return {
        type: SEARCH_BOX_FALSE
    }
}