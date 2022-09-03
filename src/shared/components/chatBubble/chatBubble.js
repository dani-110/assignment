//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Constent } from '../../../constants/AppStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// create a component
export const ChatBubble = (props) => {
    const {
        item
    } = props
    return (
        <>
            <View style={{ alignItems: item.side == 1 ? 'flex-end' : 'flex-start' }}>
                <View style={{ width: '70%', }}>
                    <View style={{
                        backgroundColor: item.side == 1 ? '#dec1f075' : '#fff',
                        marginTop: hp('0.7%'),
                        borderRadius: hp('1%'),
                        padding: hp('2%')
                    }}>
                        <Text style={{ ...Constent.msgText, color: '#000' }}>{item.msg}</Text>
                        <Text style={{ textAlign: 'right', color: '#000', fontSize: hp('1.3%') }}>{item.time}</Text>
                    </View>

                </View>
            </View>

        </>
    );
};