import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './newPass.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Circle } from '../../shared/components/Circle/circle';
import MessageBar from '../../shared/components/MessageBar';

export const NewPassStory = (props) => {
    const {
        updatePass,
        oldPassword,
        getOldPassword,
        password,
        getPassword,
        confirmPassword,
        getConfirmPassword,
        secureTextEntry1,
        toggleSecureEntry1,
        secureTextEntry2,
        toggleSecureEntry2,
        secureTextEntry3,
        toggleSecureEntry3,
        resetPassword,
        saveDisable
    } = props

    const renderIcon = (props, toggleSecureEntry) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const inputs = () => (
        <View>
            {
                updatePass ?
                    <View style={styles.input}>
                        <DataInput placeholder={"Old Password"} status={"Password"} value={oldPassword} onChang={getOldPassword} toggleSecureEntry={toggleSecureEntry3} accessoryRight={() => renderIcon(toggleSecureEntry3)} secureTextEntry={secureTextEntry3} />
                    </View>
                    : null
            }

            <View style={styles.input}>
                <DataInput placeholder={"New Password"} status={"Password"} value={password} onChang={getPassword} toggleSecureEntry={toggleSecureEntry1} accessoryRight={() => renderIcon(toggleSecureEntry1)} secureTextEntry={secureTextEntry1} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Confirm Password"} status={"Password"} value={confirmPassword} onChang={getConfirmPassword} toggleSecureEntry={toggleSecureEntry2} accessoryRight={() => renderIcon(toggleSecureEntry2)} secureTextEntry={secureTextEntry2} />
            </View>
        </View>
    )
    return (
        <BkcView >
            <View style={styles.main}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CardHeader text={'RESET PASSWORD'} style={styles.cardHeader} textStyle={{ fontSize: hp('4%') }} />
                    <View style={styles.circleView}>
                        <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.green, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={1} />
                        <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.green, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={2} />
                        <Circle style={{ ...Constent.counterCircle, backgroundColor: Colors.unread, marginHorizontal: 20 }} textStyle={{ color: '#fff' }} text={3} />
                    </View>
                    <Text style={Constent.desc}>{"Please setup your new password"}</Text>

                </View>
                <View style={{ flex: 1 }}>
                    {inputs()}
                    <View style={{ alignItems: 'center', paddingTop: hp('5%') }}>
                        <DoneButton disabled={saveDisable} func={resetPassword} text={'Save'} colors={['#9C00FF', '#9C00FF']} style={{ width: '50%' }} />
                    </View>
                </View>
            </View>
            <MessageBar />
        </BkcView>
    )
}