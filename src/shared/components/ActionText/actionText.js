//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// create a component
export function ActionText(props) {
    const {
        text,
        style,
        func
    } = props
    return (
        <TouchableOpacity onPress={func}>
            <Text style={{ ...style }}>{text}</Text>
        </TouchableOpacity>
    );
};
