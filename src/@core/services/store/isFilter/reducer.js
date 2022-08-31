import { IsFilter } from '../types'

const initialState = {
    isFilter: false
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case IsFilter:
            return {
                ...state,
                isFilter: action.value
            }
        default: return state
    }
}

export default filterReducer;