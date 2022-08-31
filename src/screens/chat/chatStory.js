import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, TextInput } from 'react-native'
import { styles } from './chat.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Player } from '../../shared/components/Player/player';
import { MsgInput } from '../../shared/components/MsgInput/msgInput';
import { ChatBubble } from '../../shared/components/chatBubble/chatBubble';
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList } from 'react-native';

export const ChatStory = (props) => {
    const {
        text,
        setText,
        newChat,
        sendMsg,
        messages
    } = props

    const obj = [
        {
            name: 'Faizan Siddiqui',
            msg: 'Hello Faizan, any update on the project',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 3,
            side: 1
        },
        {
            name: 'Unknown Contact',
            msg: 'I checked but its not working',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 0,
            side: 1
        },
        {
            name: 'Haider Ali Baig',
            msg: 'Not sure about it',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 0,
            side: 2
        },
        {
            name: 'Haider Ali Baig',
            msg: 'voicemail',
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 1,
            side: 1
        }
    ]
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#e9e4e400' }}>
            {/* <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
                <Text>To:</Text>
                
            </View> */}
            {newChat ?
                <SearchBar
                    placeholder=""
                    // onPress={() => alert("onPress")}
                    onChangeText={(text) => console.log(text)}
                    searchIconComponent={() => (
                        <Text>TO:</Text>
                    )}
                /> : null
            }
            <ScrollView style={{ flex: 1 }}>
                {!newChat ?
                    messages.map((item, index) => (
                        <ChatBubble item={item} />
                    ))
                    : null
                }
            </ScrollView>
            <MsgInput
                sendMsg={sendMsg}
                text={text}
                setText={setText}
            />
        </View>
    )
}