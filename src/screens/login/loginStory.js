import React from 'react';
import { View, Text, Image, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './login.styles';
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import MessageBar from '../../shared/components/MessageBar';
import { Images } from '../../assets/assetsPath';

export const LoginStory = (props) => {
    const {
        email,
        getEmail,
        password,
        getPassword,
        secureTextEntry,
        toggleSecureEntry,
        isSelected,
        getSelected,
        gotoSignUp,
        gotoForgot,
        gotoDashboard,
        login
    } = props
    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const inputs = () => (
        <>
            <View style={styles.input}>
                <DataInput placeholder={"Email"} value={email} onChang={getEmail} keyboardType={'email-address'} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Password"} status={"Password"} value={password} onChang={getPassword} toggleSecureEntry={toggleSecureEntry} accessoryRight={renderIcon} secureTextEntry={secureTextEntry} />
            </View>
        </>
    )

    const checkBox = () => (
        <View style={styles.checkBoxView}>
            <CheckBox
                value={isSelected}
                onValueChange={(txt) => {
                    getSelected(txt)
                }}
                style={styles.checkBox}
                boxType="square"
                onTintColor="green"
                onCheckColor="white"
                tintColors="green"
                onFillColor="green"

            />
            <Text style={{ color: '#fff', }}>Remember me</Text>
        </View>
    )

    const goToSignUp = () => (
        <View style={styles.signUpView}>
            <Text style={styles.signUpText}>New User?</Text>
            <ActionText func={gotoSignUp} style={styles.signUp} text={' Signup Here'} />
        </View>
    )

    const forgotPass = () => (
        <View style={styles.forgotView}>
            <ActionText func={gotoForgot} style={styles.forgot} text={'Forgot Password'} />
        </View>
    )

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <BkcView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.firstView}>
                            <Image source={Images.logoWhite} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
                        </View>
                        <View style={styles.secondView}>
                            <Card style={styles.card}>
                                <CardHeader text={'USER LOGIN'} style={styles.cardHeader} />
                                <View style={{ ...Constent.insideCenter }}>
                                    {inputs()}
                                    {/* {checkBox()} */}
                                    <DoneButton func={login} text={'LOGIN'} colors={Colors.btnColor} style={{ width: '70%' }} />
                                    {forgotPass()}
                                    {goToSignUp()}
                                </View>
                            </Card>
                        </View >
                    </View>
                </TouchableWithoutFeedback>
            </BkcView>
            <MessageBar />
        </KeyboardAvoidingView>
    )
}