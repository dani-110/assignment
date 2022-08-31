import React, { Component } from 'react';
import { View, TouchableOpacity, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'

import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
import { Colors } from '../../../constants/colors';

export function CalenderView(props) {

    const {
        calender,
        setCalender,
        setDate,
    } = props


    return (
        <Modal
            style={{ flex: 1 }}
            animationType="slide"
            transparent={true}
            visible={calender}
        >
            <TouchableWithoutFeedback
                onPress={() => setCalender(false)}>
                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View elevation={5} style={{
                        width: '95%', backgroundColor: '#fff',
                        margin: 10, borderRadius: 10, shadowColor: "#000000",
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                            height: 1,
                            width: 1
                        },
                    }}>
                        <TouchableHighlight>
                            <CalendarPicker
                                selectedDayTextColor="#FFFFFF"
                                selectedDayColor="grey"
                                headerWrapperStyle={{ padding: 20, justifyContent: 'space-between' }}
                                customDayHeaderStyles={{ padding: 10, }}
                                maxDate={new Date()}
                                onDateChange={(e) => {
                                    // setCalender(false)
                                    setDate(moment(e).format("ddd, MMM D, YYYY"))
                                }}
                                allowRangeSelection={true}
                                todayBackgroundColor={'#000'}
                                selectedDayColor={Colors.purple}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    )

}