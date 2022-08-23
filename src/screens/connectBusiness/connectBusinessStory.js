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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <BkcView>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, ...Constent.insideCenter }}>
                        <Text style={{ fontSize: 30, color: Colors.headerColor, fontWeight: '500', textAlign: 'center' }}>{'Connect To\nBusiness Account'}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%' }}>
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                            <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={2} />
                        </View>
                    </View>
                    <View style={{ flex: 1, ...Constent.insideCenter }}>
                        <Text style={{ textAlign: 'center', color: Colors.headerColor, fontSize: 25, fontWeight: '300', marginBottom: 10 }}>{"Please enter the\n Business Account ID"}</Text>

                        <View style={{ width: '80%', paddingTop: 10 }}>
                            {inputs()}
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <DoneButton func={gotoVerification} text={'PROCEED'} colors={Colors.btnColor} style={{ width: '50%' }} />
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>


                        </View>
                    </View>
                </View>
            </BkcView>
        </KeyboardAvoidingView>
    )
}