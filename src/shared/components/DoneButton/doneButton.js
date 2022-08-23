//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Images } from '../../../../cometchat-pro-react-native-ui-kit/src/theme';
import { styles } from './style'
import LinearGradient from 'react-native-linear-gradient';
// import { Images } from '../../../assets/theme'

// create a component
export function DoneButton(props) {
    const {
        text,
        func,
        style,
        colors,
        textStyle
    } = props
    return (
        <TouchableOpacity
            style={{ ...styles.btn, ...style }}
            onPress={func}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={colors}
                style={{ ...styles.view, }}
            >
                <Text style={{ ...styles.text, ...textStyle }}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

DoneButton.defaultProps = {
    text: "something special",
    status: "",
    func: () => null,
    colors: ['#A0CC78', '#207561']
}