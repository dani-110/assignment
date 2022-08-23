//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './style';

// create a component
export const Card = (props) => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
};
