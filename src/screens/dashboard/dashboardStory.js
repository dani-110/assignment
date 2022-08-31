import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { styles } from './dashboard.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';

import { CalenderView } from '../../shared/components/Calender/calender';
export const DashboardStory = (props) => {
    const {
        navigation,
        date,
        setDate,
        calender,
        setCalender
    } = props

    const mainView = () => (
        <View style={{ flex: 1, ...Constent.insideCenter }}>
            <View style={{ ...Constent.insideCenter, position: 'absolute', top: 20 }}>
                <TouchableOpacity onPress={() => setCalender(true)} style={styles.barView}>
                    <Text>Date Range</Text>
                </TouchableOpacity>

            </View>
            {/* <View style={{ height: 550, padding: 20, }}> */}
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.gridView}>
                    <Text style={styles.count}>127</Text>
                    <Text style={styles.desc}>Total Calls</Text>
                </View>
                <View style={styles.gridView}>
                    <Text style={styles.count}>229</Text>
                    <Text style={styles.desc}>Total SMS</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.gridView}>
                    <Text style={styles.count}>47</Text>
                    <Text style={styles.desc}>Received Calls</Text>
                </View>
                <View style={styles.gridView}>
                    <Text style={styles.count}>80</Text>
                    <Text style={styles.desc}>Dialed Calls</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.gridView}>
                    <Text style={styles.count}>174</Text>
                    <Text style={styles.desc}>SMS Sent</Text>
                </View>
                <View style={styles.gridView}>
                    <Text style={styles.count}>55</Text>
                    <Text style={styles.desc}>SMS Received</Text>
                </View>
            </View>
            {/* </View> */}
        </View>
    )
    return (
        <View style={{ flex: 1 }}>
            {mainView()}
            <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
                {IconTab({ ...props })}
            </View>
            <CalenderView
                calender={calender}
                setCalender={setCalender}
                setDate={setDate}
            />
        </View>
    )
}