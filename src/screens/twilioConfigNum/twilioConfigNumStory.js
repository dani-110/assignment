import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './twilioConfigNum.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { VerifyCode } from '../../shared/components/verifyCode/verifyCode';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { Circle } from '../../shared/components/Circle/circle';

export const TwilioConfigNumStory = (props) => {
    const {
        ssid,
        setSsid,
        authToken,
        setAuthToken,
        gotoDashboard
    } = props

    const inputs = () => (
        <>
            <View style={styles.input}>
                <DataInput placeholder={"Phone Number"} value={ssid} onChang={setSsid} />
            </View>
        </>
    )
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <BkcView>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, ...Constent.insideCenter }}>
                        <Text style={{ fontSize: 30, color: Colors.headerColor, fontWeight: '500', textAlign: 'center' }}>{'TWILIO\nConfiguration'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%' }}>
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.green, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={2} />
                        </View>
                    </View>
                    <View style={{ flex: 1, ...Constent.insideCenter }}>
                        <Text style={{ textAlign: 'center', color: Colors.headerColor, fontSize: 25, fontWeight: '300', marginBottom: 10 }}>{"Select the Phone Number\n you want to use"}</Text>

                        <View style={{ width: '80%' }}>
                            {inputs()}
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <DoneButton func={gotoDashboard} text={'PROCEED'} colors={Colors.btnColor} style={{ width: '50%' }} />
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>

                            <Text style={{ textAlign: 'center', color: Colors.headerColor, fontSize: 15, fontWeight: '400', marginBottom: 10 }}>{"If you have multiple numbers,\n you may switch it later."}</Text>
                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BkcView>
        </KeyboardAvoidingView>
    )
}