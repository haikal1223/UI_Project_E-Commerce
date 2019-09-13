import {SEARCH_BOX_DATA, SEARCH_BOX_FALSE} from '../Action/type'

const INITIAL_STATE  = {status: false, searchtext: ''}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SEARCH_BOX_DATA:
            return {
                ...state, status: true, searchtext: action.payload
            }
        case SEARCH_BOX_FALSE:
            return INITIAL_STATE
       
        default:
            return state
    }
}