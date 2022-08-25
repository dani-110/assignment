import { User } from '../types'

export const UserValue = (value) => {
    return {
        type: User,
        value
    }
}