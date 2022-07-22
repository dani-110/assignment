import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from "./styles";

export const MovieItem = (props) => {

    const {
        item,
        setToFav,
        isFav,
        removeToFav
    } = props

    return (
        <View style={styles.main}>
            <View style={styles.imgView}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={{ height: 200, width: 100, margin: 10, borderRadius: 10 }}
                    resizeMode={'cover'}
                />
                {
                    isFav.includes(item.id) ?
                        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => { removeToFav(item) }}>
                            <Text>remove from Favorite</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => { setToFav(item) }}>
                            <Text>Favorite</Text>
                        </TouchableOpacity>
                }

            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <Text>Movie: {item.title}</Text>
                <Text>Overview: {item.overview}</Text>
            </View>
        </View>
    )
}