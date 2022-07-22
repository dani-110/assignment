import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const Movies = (props) => {
    const {
        data,
        lastMovieRemove
    } = props
    return (
        <View style={{ borderWidth: 1, fontSize: 20, padding: 10, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{data.title}</Text>
            <Text>{data.releaseYear}</Text>
            <TouchableOpacity onPress={() => lastMovieRemove(data.id)} style={{ height: 20, width: 20, borderRadius: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 1, right: 1 }}>

                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>-</Text>

            </TouchableOpacity>
        </View>
    )
}