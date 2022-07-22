import { FavMovie } from '../types'

export const movieDetail = (params) => {
    return {
        type: FavMovie,
        params
    }
}
