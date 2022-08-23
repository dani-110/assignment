//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Constent } from '../../../constants/AppStyles';
import { styles } from './style';

// create a component
export const CardHeader = (props) => {
    const {
        text,
        style,
        textStyle
    } = props
    return (
        <View style={{ ...Constent.insideCenter, ...style }}>
            <Text style={{ color: Colors.headerColor, ...Constent.cardHeader, ...textStyle }}>{text}</Text>
        </View>
    );
};