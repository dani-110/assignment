import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Card } from '../../shared/components/Card/card';
import { CardHeader } from '../../shared/components/CardHeader/cardHeader';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ActionText } from '../../shared/components/ActionText/actionText';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './signUp.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import MessageBar from '../../shared/components/MessageBar';

export const SignUpStory = (props) => {
    const {
        firstName,
        getFirstName,
        lastName,
        getLastName,
        email,
        getEmail,
        company,
        getCompany,
        domain,
        getDomain,
        password,
        getPassword,
        confirmPassword,
        getConfirmPassword,
        secureTextEntry1,
        toggleSecureEntry1,
        secureTextEntry2,
        toggleSecureEntry2,
        isSelected,
        getSelected,
        gotoLogin,
        gotoVerification,
        signUp
    } = props
    const renderIcon1 = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry1}>
            <Icon {...props} name={secureTextEntry1 ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );
    const renderIcon2 = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry2}>
            <Icon {...props} name={secureTextEntry2 ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const inputs = () => (
        <>
            <View style={styles.input}>
                <DataInput placeholder={"First Name"} value={firstName} onChang={getFirstName} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Last Name"} value={lastName} onChang={getLastName} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Email"} value={email} onChang={getEmail} keyboardType={'email-address'} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Company"} value={company} onChang={getCompany} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Website"} value={domain} onChang={getDomain} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Password"} status={"Password"} value={password} onChang={getPassword} toggleSecureEntry={toggleSecureEntry1} accessoryRight={renderIcon1} secureTextEntry={secureTextEntry1} />
            </View>
            <View style={styles.input}>
                <DataInput placeholder={"Confirm Password"} status={"Password"} value={confirmPassword} onChang={getConfirmPassword} toggleSecureEntry={toggleSecureEntry2} accessoryRight={renderIcon2} secureTextEntry={secureTextEntry2} />
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
            <Text style={{ color: '#fff', }}>{'I accept the Terms & condition'}</Text>
        </View>
    )

    const goToLogin = () => (
        <View style={styles.signUpView}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <ActionText func={gotoLogin} style={styles.signUp} text={' Login Here'} />
        </View>
    )

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <BkcView>
                {/* // <SafeAreaView style={{ flex: 1 }}> */}
                {/* <View style={styles.firstView}>
                </View> */}
                <View style={styles.secondView}>
                    <Card style={styles.card}>
                        <CardHeader text={'SIGNUP'} style={styles.cardHeader} />
                        <View style={{ ...Constent.insideCenter }}>
                            {inputs()}
                            {checkBox()}
                            <DoneButton func={signUp} text={'SIGNUP'} colors={Colors.btnColor} style={{ width: '70%' }} />
                            {goToLogin()}
                        </View>
                    </Card>
                </View>
                {/* // </SafeAreaView> */}
            </BkcView>
            <MessageBar />
        </KeyboardAvoidingView>
    )
}