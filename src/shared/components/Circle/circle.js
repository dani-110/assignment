//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Constent } from '../../../constants/AppStyles';
import { styles } from './style';

// create a component
export const Circle = (props) => {
    const {
        text,
        style,
        textStyle
    } = props
    return (
        <View style={{ ...Constent.insideCenter, borderRadius: 100, ...style }}>
            <Text style={{ ...Constent.cardHeader, ...textStyle }}>{text}</Text>
        </View>
    );
};