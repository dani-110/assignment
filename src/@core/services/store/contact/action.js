import { Contact } from '../types'

export const contactValue = (value) => {
    return {
        type: Contact,
        value
    }
}