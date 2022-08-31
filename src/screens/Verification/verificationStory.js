import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { styles } from './verification.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { VerifyCode } from '../../shared/components/verifyCode/verifyCode';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Circle } from '../../shared/components/Circle/circle';
import MessageBar from '../../shared/components/MessageBar';

import * as Progress from 'react-native-progress';

export const VerificationStory = (props) => {
    const {
        code,
        getCode,
        gotoNewPass,
        fromView,
        borderColor,
        barCounter,
        resendDisable,
        counter,
        counterDisable,
        editable,
        codeResend
    } = props

    const inputs = () => (
        <>
            <View style={styles.input}>
                <View style={{ opacity: editable ? 1 : 0.3 }}>
                    <VerifyCode editable={editable} borderColor={borderColor} verifyCode={code} setVerifyCode={getCode} />
                </View>

                {
                    !counterDisable ?
                        <Text style={{ textAlign: 'center', fontSize: 20, color: Colors.headerColor, marginTop: 20 }}>{`00:${counter?.toString().length == 1 ? '0' + counter : counter}`}</Text>
                        : <Text style={{ textAlign: 'center', fontSize: 20, color: 'transparent', marginTop: 20 }}>{`00:${counter?.toString().length == 1 ? '0' + counter : counter}`}</Text>
                }
            </View>
        </>
    )
    return (
        <BkcView >
            {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.main}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <CardHeader text={fromView == 'connect' ? 'Connect To\nBusiness Account' : 'VERIFY EMAIL'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%'), textAlign: 'center' }} />
                        {fromView == 'connect' ?
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: hp('5%') }}>
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.green, marginHorizontal: wp('4%') }} textStyle={{ color: '#fff' }} text={1} />
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: wp('4%') }} textStyle={{ color: '#fff' }} text={2} />
                            </View>
                            : fromView !== 'signup' ? <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: hp('5%') }}>
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.green, marginHorizontal: wp('4%') }} textStyle={{ color: '#fff' }} text={1} />
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: wp('4%') }} textStyle={{ color: '#fff' }} text={2} />
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: wp('4%') }} text={3} />
                            </View>
                                : null
                        }
                        <Text style={{ ...Constent.desc, marginTop: hp('5%') }}>{`Please enter the 4 digit\n ${fromView == 'connect' ? 'authorization' : 'verification'} code, sent to your\n ${fromView == 'connect' ? 'account admin' : 'email address'}`}</Text>
                    </View >
                    <View style={{ flex: 1 }}>
                        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {inputs()}
                            </View>
                        </KeyboardAvoidingView>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            {fromView !== 'connect' ?
                                <>
                                    <View style={{ marginVertical: hp('2%'), ...Constent.insideCenter }}>
                                        <View >
                                            <TouchableOpacity onPress={codeResend} disabled={resendDisable} activeOpacity={resendDisable ? 1 : 0} style={{ marginTop: 5, height: hp('5%'), ...Constent.insideCenter }}>
                                                <Progress.Bar animationType={'timing'} progress={barCounter} unfilledColor={'#730080'} borderColor={'transparent'} height={hp('5%')} width={200} color={'#9C01FF'} borderRadius={10} borderWidth={0} />
                                                <Text style={{ fontSize: hp('2%'), color: Colors.headerColor, fontWeight: '500', position: 'absolute', backgroundColor: 'transparent' }}>Resend Code</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    <Text style={styles.bottomDesc}>{"Please check your spam folder, If you don't\n receive the email in your inbox"}</Text>
                                </>
                                : null}

                        </View>

                    </View >
                </View>
            </TouchableWithoutFeedback>
            {/* </KeyboardAvoidingView> */}
            <MessageBar />
        </BkcView>
    )
}