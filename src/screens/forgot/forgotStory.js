import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './forgot.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Circle } from '../../shared/components/Circle/circle';
import MessageBar from '../../shared/components/MessageBar';

export const ForgotStory = (props) => {
    const {
        email,
        getEmail,
        gotoVerification,
        forgot
    } = props

    const inputs = () => (
        <>
            <View style={styles.input}>
                <DataInput placeholder={"Email"} value={email} onChang={getEmail} keyboardType={'email-address'} />
            </View>
        </>
    )
    return (
        <BkcView >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.main}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <CardHeader text={'RESET PASSWORD'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%') }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: hp('5%') }}>
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={2} />
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={3} />
                        </View>
                        <Text style={{ ...Constent.desc, marginTop: hp('5%') }}>{"Please enter your\n email address"}</Text>
                    </View >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {inputs()}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <DoneButton func={forgot} text={'PROCEED'} colors={['#9C00FF', '#9C00FF']} style={{ width: hp('20%') }} />
                        </View>

                    </View >
                </View>
            </TouchableWithoutFeedback>
            <MessageBar />
        </BkcView>
    )
}