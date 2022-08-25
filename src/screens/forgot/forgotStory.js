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
            <View style={styles.main}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CardHeader text={'RESET PASSWORD'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%') }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%' }}>
                        <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                        <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={2} />
                        <Circle style={{ ...Constent.counterCircle, backgroundColor: '#fff', marginHorizontal: 20 }} text={3} />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <Text style={Constent.desc}>{"Please enter your\n email address"}</Text>
                    {inputs()}
                </View>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: hp('4%') }}>
                    <DoneButton func={forgot} text={'PROCEED'} colors={['#9C00FF', '#9C00FF']} style={{ width: '50%' }} />
                </View>
            </View>
        </BkcView>
    )
}