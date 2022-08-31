//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../constants/colors';
// create a component
export const BkcView = (props) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={Colors.bkcColor}
            style={{ flex: 1 }}
        >{props.children}
        </LinearGradient>
    );
};
