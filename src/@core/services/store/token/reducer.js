import { Token } from '../types'

const initialState = {
    token: '',
}

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case Token:
            return {
                ...state,
                token: action.value
            }
        default: return state
    }
}

export default tokenReducer;