import { FavMovie } from '../types'

const initialState = {
    movie: [],
    id: []
}

export const favMovieReducer = (State = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case FavMovie:
            return {
                ...State,
                movie: action.params.movie,
                id: action.params.id
            }
        default: return State
    }
}