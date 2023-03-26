import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { styles } from './conversation.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Player } from '../../shared/components/Player/player';

export const ConversationStory = (props) => {
    const {
        gotoChat
    } = props

    const obj = [
        {
            name: 'Faizan Siddiqui',
            msg: 'Hello Faizan, any update on the project',
            number: '+923000569491',
            time: '9:30\npm',
            date: '03 Aug 2022',
            unread: 3
        },
        {
            name: 'Unknown Contact',
            msg: 'I checked but its not working',
            number: '+923000569491',
            time: '9:30\npm',
            date: '03 Aug 2022',
            unread: 0
        },
        {
            name: 'Haider Ali Baig',
            msg: 'Not sure about it',
            number: '+923000569491',
            time: '9:30\npm',
            date: '03 Aug 2022',
            unread: 0
        },
        {
            name: 'Haider Ali Baig',
            msg: 'voicemail',
            number: '+923000569491',
            time: '9:30\npm',
            date: '03 Aug 2022',
            unread: 1
        }
    ]

    const mainView = (data, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => gotoChat(data)} style={styles.main}>
                <View style={{ padding: hp('1%') }}>
                    <View>
                        <Text style={{ color: data.unread > 0 ? Colors.unread : null }}>{data.time}</Text>
                    </View>

                </View>
                <View style={{ flex: 1, padding: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), color: data.unread > 0 ? Colors.unread : null, paddingBottom: hp('1%') }}>{data.name}</Text>
                    <Text style={{ opacity: 0.7, color: data.unread > 0 ? Colors.unread : null }}>{data.msg}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    {
                        data.unread > 0 ?
                            <View style={styles.unread}>
                                <Text style={styles.unreadText}>{data.unread}</Text>
                            </View>
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, padding: hp('2%') }}>
            {
                obj.map((item, index) => (
                    mainView(item, index)
                ))
            }
        </ScrollView>
        // </SafeAreaView>
    )
}