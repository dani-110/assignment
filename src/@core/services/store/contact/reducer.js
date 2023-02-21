import { Contact } from '../types'

const initialState = {
    contactList: []
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case Contact:
            return {
                ...state,
                contactList: action.value
            }
        default: return state
    }
}

export default contactReducer;