import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './connectWith.style'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Circle } from '../../shared/components/Circle/circle';

export const ConnectWithStory = (props) => {
    const {
        gotoTwilio,
        gotoConnectBusiness
    } = props

    return (
        <BkcView >
            <View style={styles.main}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CardHeader text={'How Would You\nLike To Connect?'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%'), textAlign: 'center' }} />
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', paddingTop: hp('4%') }}>
                        <DoneButton func={gotoTwilio} text={'Connect To Twilio Account'} colors={['#9C00FF', '#9C00FF']} />
                    </View>

                    <View style={{ alignItems: 'center', paddingTop: hp('4%') }}>
                        <CardHeader text={'OR'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%'), textAlign: 'center' }} />
                    </View>

                    <View style={{ alignItems: 'center', paddingTop: hp('4%') }}>
                        <DoneButton func={gotoConnectBusiness} text={`Connect To Business Account`} colors={['#9C00FF', '#9C00FF']} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
        </BkcView>
    )
}