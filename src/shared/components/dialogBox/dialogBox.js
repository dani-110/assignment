//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Dialog from "react-native-dialog";
import { DoneButton } from '../DoneButton/doneButton';

// create a component
export function DialogBox(props) {
    const {
        visible,
        setVisible,
        title,
        style
    } = props
    return (
        <Dialog.Container
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            contentStyle={{ ...style }}
        >
            {
                title ?
                    <Dialog.Title > {title}</Dialog.Title >
                    : null
            }
            {props.children}


        </ Dialog.Container>
    );
};

DialogBox.defaultProps = {
    visible: false,
    setVisible: () => null,
    title: '',
    style: {}
}