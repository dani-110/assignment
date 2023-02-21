import React, { Component } from 'react';
import { View, TouchableOpacity, Modal, TouchableWithoutFeedback, TouchableHighlight, Animated } from 'react-native'

import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
import { Colors } from '../../../constants/colors';
import { Constent } from '../../../constants/AppStyles';

export function CalenderView(props) {

    const {
        setStartDate,
        setEndDate
    } = props

    const onDateChange = (val, type) => {
        setEndDate('')
        if (type === 'END_DATE') {
            setEndDate(val == null ? '' : getDay(val))
        } else {
            setStartDate(getDay(val))
        }
    }

    function getDay(date) {
        return moment(date).calendar({
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: 'MMM Do, YYYY',
            sameElse: 'MMM Do, YYYY'
        })
    }

    return (

        <View style={{ width: '100%', ...Constent.insideCenter }}>
            <CalendarPicker
                selectedDayTextColor="#FFFFFF"
                selectedDayColor="grey"
                headerWrapperStyle={{ padding: 10, justifyContent: 'space-between' }}
                maxDate={new Date()}
                onDateChange={onDateChange}
                allowRangeSelection={true}
                todayBackgroundColor={'#000'}
                selectedDayColor={Colors.purple}
                width={350}
            // scrollable={true}
            />
        </View>
    )

}