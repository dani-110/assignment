import { IsFilter } from '../types'

export const filterValue = (value) => {
    return {
        type: IsFilter,
        value
    }
}