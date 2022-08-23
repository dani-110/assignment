import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { styles } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../../constants/colors';
import { Constent } from '../../../constants/AppStyles';
// create a component
export function MsgInput(props) {
    const {
        text,
        setText,
        sendMsg
    } = props
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.bottomMain}>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <TextInput
                            // maxLength={250}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Type your message..."
                            placeholderTextColor='gray'
                            onChangeText={(text) => setText(text)}
                            value={text}
                            // style={{ padding: 10, width: Dimensions.get('window').width - 50, height: 120 }}
                            style={styles.inputText}
                        />
                    </View>
                    <View style={Constent.insideCenter}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={Colors.btnColor} style={styles.send}>
                            <TouchableOpacity onPress={sendMsg} >
                                <Icon
                                    name="send"
                                    size={18}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}