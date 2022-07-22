import React, { useEffect, useState } from 'react';
import { MoviesStory } from './moviesStory';
import axios from '../../@core/services/utilsfunctions'
import { useDispatch, useSelector } from 'react-redux'
import { movieDetail } from '../../@core/services/store';


export const Movies = () => {

    const [movies, setMovies] = useState([])

    const dispatch = useDispatch()
    const select = useSelector((state) => {
        return state.favMovieReducer
    })

    useEffect(() => {
        getMovies()
    }, [])
    const getMovies = () => {
        axios._getApi('/popular?api_key=22907ab1c4830499c6f448ee8846a29c&language=en-US').then(res => {
            console.log(res)
            if (res.status == 200) {
                setMovies(res.data.results.concat())
            }
        })
    }

    const setToFav = (e) => {
        console.log(e)

        console.log(select)
        let arr = [...select.movie]
        arr.push(e)
        let arrId = [...select.id]
        arrId.push(e.id)
        dispatch(movieDetail({ movie: arr, id: arrId }))
    }

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
        <MoviesStory
            movies={movies}
            setToFav={setToFav}
            isFav={select.id}
            removeToFav={removeToFav}
        />
    )
}