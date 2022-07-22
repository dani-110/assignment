import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native'
import { MovieItem } from '../../shared/components/movieItem';

export const MoviesStory = (props) => {
    const {
        movies,
        setToFav,
        isFav,
        removeToFav
    } = props

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ padding: 10 }}>
                {
                    movies.map((e, i) => {
                        return (
                            <MovieItem
                                key={e.id}
                                item={e}
                                setToFav={setToFav}
                                isFav={isFav}
                                removeToFav={removeToFav}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}