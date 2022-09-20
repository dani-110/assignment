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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageBar from '../../shared/components/MessageBar';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TwilioConfigNumStory = (props) => {
    const {
        open,
        setOpen,
        value,
        setValue,
        items,
        setItems,
        gotoDashboard,
        setTwilioConfig
    } = props

    const inputs = () => (
        <>
            <View style={styles.barView}>
                <DropDownPicker
                    style={{ borderWidth: 0 }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Select a number'}
                    dropDownContainerStyle={{ borderWidth: 0, marginTop: 5 }}
                    TickIconComponent={() => <View style={styles.check}>
                        <Icon
                            name={'done'}
                            size={12}
                            color={Colors.purple}
                        />
                    </View>}
                />
            </View>
        </>
    )
    return (

        <BkcView >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.main}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <CardHeader text={'TWILIO\nConfiguration'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%'), textAlign: 'center' }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: hp('5%') }}>
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.green, marginHorizontal: wp('4%') }} textStyle={{ color: '#fff' }} text={1} />
                                <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: wp('4%') }} textStyle={{ color: '#fff' }} text={2} />
                            </View>
                            <Text style={{ ...Constent.desc, marginTop: hp('5%') }}>{"Select the Phone Number\n you want to use"}</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: hp('5%') }}>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {inputs()}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                <DoneButton func={gotoDashboard} text={'PROCEED'} colors={['#9C00FF', '#9C00FF']} style={{ width: hp('20%') }} />
                                <Text style={styles.bottomDesc}>{"If you have multiple numbers,\n you may switch it later."}</Text>
                            </View>

                        </View >
                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
            <MessageBar />
        </BkcView>
    )
}