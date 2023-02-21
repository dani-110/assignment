import { Info } from '../types'

const initialState = {
    isInfo: false
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case Info:
            return {
                ...state,
                isInfo: action.value
            }
        default: return state
    }
}

export default infoReducer;