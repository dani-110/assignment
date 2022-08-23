import { Token } from '../types'

export const tokenValue = (value) => {
    return {
        type: Token,
        value
    }
}