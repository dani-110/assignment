import React from 'react';
import { FavoriteStory } from './favoriteStory';
import { useDispatch, useSelector } from 'react-redux'
import { movieDetail } from '../../@core/services/store';
export const Favorite = () => {


    const dispatch = useDispatch()
    const select = useSelector((state) => {
        return state.favMovieReducer
    })

    const removeToFav = (e) => {
        console.log(e)
        let arr = [...select.movie]
        let key = arr.findIndex(
            (c) => c.id === e.id
        )
        arr.splice(key, 1)
        let arrId = [...select.id]
        let key2 = arr.findIndex(
            (c) => c === e.id
        )
        arrId.splice(key2, 1)
        console.log(arrId)
        dispatch(movieDetail({ movie: arr, id: arrId }))
    }

    return (
        <FavoriteStory
            movies={select.movie}
            isFav={select.id}
            removeToFav={removeToFav}
        />
    )
}