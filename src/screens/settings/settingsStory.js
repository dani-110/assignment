//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { styles } from './settings.styles';
import { Constent } from '../../constants/AppStyles';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';
import { ScrollView } from 'react-native';

// create a component
export const SettingsStory = (props) => {
    const {
        name,
        getName,
        email,
        getEmail,
        company,
        getCompany,
        domain,
        getDomain,
        ssid,
        getSsid,
        authToken,
        getAuthToken,
        phone,
        getPhone,
        visible,
        setVisible,
        password,
        getPassword,
        confirmPassword,
        getConfirmPassword,
        secureTextEntry1,
        toggleSecureEntry1,
        secureTextEntry2,
        toggleSecureEntry2,
        existing,
        getExisting,
        secureTextEntry3,
        toggleSecureEntry3,
        updateProfile
    } = props

    const header = (text) => (
        <View style={styles.headerView}>
            <Text style={styles.headerTxt}>{text}</Text>
        </View>
    )

    const input = () => (
        <>
            <View style={styles.input}>
                <DataInput
                    placeholder={'Name'}
                    value={name}
                    onChang={getName}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    unselectedTextColor={Colors.purple} />
            </View>
            <View style={styles.input}>
                <DataInput
                    placeholder={'Email'}
                    value={email}
                    onChang={getEmail}
                    keyboardType={'email-address'}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    editable={false}
                    unselectedTextColor={Colors.purple} />
            </View>
            <View style={styles.input}>
                <DataInput
                    placeholder={'Company'}
                    value={company}
                    onChang={getCompany}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    unselectedTextColor={Colors.purple} />
            </View>
            <View style={styles.input}>
                <DataInput
                    placeholder={'Website'}
                    value={domain}
                    onChang={getDomain}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    unselectedTextColor={Colors.purple} />
            </View>

        </>
    )

    const twilioView = () => (
        <>
            <View style={styles.input}>
                <DataInput
                    placeholder={'SID'}
                    value={ssid}
                    onChang={getSsid}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    unselectedTextColor={Colors.purple} />
            </View>

            {/* {IconTab({ ...props })} */}
            <View style={styles.input}>
                <DataInput
                    placeholder={'Auth Token'}
                    value={authToken}
                    onChang={getAuthToken}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    unselectedTextColor={Colors.purple} />
            </View>

            <View style={styles.input}>
                <DataInput
                    placeholder={'Phone'}
                    value={phone}
                    onChang={getPhone}
                    selectedTextColor={Colors.purple}
                    backgroundColor={Colors.headerBase}
                    unselectedTextColor={Colors.purple} />
            </View>
        </>
    )


    const passView = () => (
        <View style={styles.passView}>
            <Text style={{ marginLeft: 10 }}>********</Text>
            <TouchableOpacity onPress={() => { setVisible(true) }} style={styles.passBtn}>
                <Text style={{ color: '#fff' }}>Change</Text>
            </TouchableOpacity>
        </View>
    )


    const dialogView = () => (
        <DialogBox
            visible={visible}
            setVisible={setVisible}
            title={'Change Password'}
            style={{ width: Dimensions.get('window').width - 50, borderRadius: 20 }}
        >
            <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
                <View style={styles.input}>
                    <DataInput
                        placeholder={"Existing Password"}
                        status={"Password"}
                        value={existing}
                        onChang={getExisting}
                        toggleSecureEntry={toggleSecureEntry3}
                        accessoryRight={() => renderIcon(toggleSecureEntry3)}
                        secureTextEntry={secureTextEntry3}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple} />
                </View>

                <View style={styles.input}>
                    <DataInput
                        placeholder={"New Password"}
                        status={"Password"}
                        value={password}
                        onChang={getPassword}
                        toggleSecureEntry={toggleSecureEntry1}
                        accessoryRight={() => renderIcon(toggleSecureEntry1)}
                        secureTextEntry={secureTextEntry1}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple} />
                </View>
                <View style={styles.input}>
                    <DataInput
                        placeholder={"Confirm Password"}
                        status={"Password"}
                        value={confirmPassword}
                        onChang={getConfirmPassword}
                        toggleSecureEntry={toggleSecureEntry2}
                        accessoryRight={() => renderIcon(toggleSecureEntry2)}
                        secureTextEntry={secureTextEntry2}
                        selectedTextColor={Colors.purple}
                        backgroundColor={Colors.headerBase}
                        unselectedTextColor={Colors.purple} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <DoneButton func={() => setVisible(false)} text={'Cancel'} colors={['#9C00FF', '#9C00FF']} />
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>
                        <DoneButton func={() => setVisible(false)} text={'Save'} colors={['#9C00FF', '#9C00FF']} />
                    </View>
                </View>
            </View>

        </DialogBox>
    )
    return (
        <SafeAreaView style={styles.main}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView style={{ paddingHorizontal: 30 }}>
                    {header('Account Info')}
                    {input()}
                    {header('Twilio Settings')}
                    {twilioView()}
                    {header('Password')}
                    {passView()}
                    {dialogView()}
                    <View style={{ flex: 1, paddingVertical: 30, ...Constent.insideCenter }}>
                        <DoneButton func={updateProfile} text={'Save'} colors={['#9C00FF', '#9C00FF']} style={{ width: '50%' }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
