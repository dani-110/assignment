import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './twilioConfig.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { VerifyCode } from '../../shared/components/verifyCode/verifyCode';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Circle } from '../../shared/components/Circle/circle';

export const TwilioConfigStory = (props) => {
    const {
        ssid,
        setSsid,
        authToken,
        setAuthToken,
        gotoTwilioConfigNum
    } = props

    const inputs = () => (
        <>
            <View style={styles.input}>
                <DataInput placeholder={"SSID"} value={ssid} onChang={setSsid} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Auth Token"} value={authToken} onChang={setAuthToken} />
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
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={2} />
                        </View>
                    </View>
                    <View style={{ flex: 1, ...Constent.insideCenter }}>
                        <Text style={{ textAlign: 'center', color: Colors.headerColor, fontSize: 25, fontWeight: '300', marginBottom: 10 }}>{"Please enter your\n Twilio account credentials"}</Text>

                        <View style={{ width: '80%' }}>
                            {inputs()}
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <DoneButton func={gotoTwilioConfigNum} text={'PROCEED'} colors={Colors.btnColor} style={{ width: '50%' }} />
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>

                            <Text style={{ textAlign: 'center', color: Colors.headerColor, fontSize: 15, fontWeight: '400', marginBottom: 10 }}>{"Can't find these credientials? "}<Text style={{ textDecorationLine: 'underline', fontSize: 15, color: Colors.headerColor, }}>Click Here</Text></Text>
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