import {SEARCH_BOX_DATA} from '../Action/type'

const INITIAL_STATE  = []

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SEARCH_BOX_DATA:
            return {INITIAL_STATE, ...action.payload}
        default:
            return state
    }
}