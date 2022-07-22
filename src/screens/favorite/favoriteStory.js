import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native'
import { MovieItem } from '../../shared/components/movieItem';

export const FavoriteStory = (props) => {
    const {
        movies,
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