//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/colors';
import { styles } from './style';

// create a component
export function IconTab(props) {
    const {
        navigation
    } = props

    const gotoCallLogs = () => {
        navigation.navigate('CallLogs')
    }
    const gotoMsgLogs = () => {
        navigation.navigate('Conversation')
    }
    const gotoDialer = () => {
        navigation.navigate('Dialer')
    }
    return (
        <View style={styles.iconsView}>
            <TouchableOpacity onPress={gotoCallLogs}>
                <Icon
                    name='call'
                    color={Colors.black}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoDialer}>
                <Icon
                    name='dialpad'
                    color={Colors.black}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoMsgLogs}>
                <Icon
                    name='email'
                    color={Colors.black}
                    size={30}
                />
            </TouchableOpacity>
        </View>
    );
};
