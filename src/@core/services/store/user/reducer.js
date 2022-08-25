import { User } from '../types'

const initialState = {
    user: {},
    isLogin: false
}

const UserReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case User:
            return {
                ...state,
                user: action.value.user,
                isLogin: action.value.isLogin
            }
        default: return state
    }
}

export default UserReducer;