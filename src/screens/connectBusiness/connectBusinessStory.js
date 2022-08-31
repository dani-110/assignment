import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './connectBusiness.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { Circle } from '../../shared/components/Circle/circle';
import MessageBar from '../../shared/components/MessageBar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ConnectBusinessStory = (props) => {
    const {
        accountID,
        setAccountID,
        gotoVerification
    } = props

    const inputs = () => (
        <>
            <View style={styles.input}>
                <DataInput placeholder={"Enter the account ID here"} value={accountID} onChang={setAccountID} />
            </View>
        </>
    )
    return (

        <BkcView >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.main}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <CardHeader text={'Connect To\nBusiness Account'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%'), textAlign: 'center' }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: hp('5%') }}>
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={2} />
                            </View>
                            <Text style={{ ...Constent.desc, marginTop: hp('5%') }}>{"Please enter the\n Business Account ID"}</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: hp('5%') }}>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {inputs()}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                <DoneButton func={gotoVerification} text={'PROCEED'} colors={['#9C00FF', '#9C00FF']} style={{ width: hp('20%') }} />
                            </View>

                        </View >
                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
            <MessageBar />
        </BkcView>
    )
}