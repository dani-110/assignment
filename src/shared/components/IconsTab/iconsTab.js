//import liraries
import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/colors';
import { styles } from './style';
import { Icons } from '../../../assets/assetsPath';
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
                <Icons.PhoneCall width={30} height={30} fill={"#000"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoDialer}>
                <Icon
                    name='dialpad'
                    color={Colors.black}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoMsgLogs}>
                <Icons.Message width={30} height={30} fill={"#000"} />
            </TouchableOpacity>
        </View>
    );
};
