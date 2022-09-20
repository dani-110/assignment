//import liraries
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { Constent } from '../../../../constants/AppStyles';
import { Colors } from '../../../../constants/colors';
import { styles } from './drawer.styles';
import { useDispatch, useSelector } from 'react-redux'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// create a component
export const DrawerHeader = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const selector = useSelector((state) => {
        return state.UserReducer.user
    })
    console.log(selector)
    return (
        <View style={{ marginBottom: hp('2%') }} >
            <View style={styles.headerMain}>

                <View style={{ ...styles.activeStatus, backgroundColor: isEnabled ? Colors.availale : Colors.busy }}></View>

                <Text style={{ color: Colors.headerColor, ...Constent.mainFont }}>{`${selector?.data?.FirstName} ${selector?.data?.LastName}`}</Text>


                <Switch
                    trackColor={{ false: Colors.busy, true: Colors.green }}
                    thumbColor={Colors.headerColor}
                    ios_backgroundColor={Colors.busy}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ borderWidth: 3, borderColor: isEnabled ? Colors.availale : Colors.unread, marginLeft: wp('5%') }}
                />
            </View>
            <View style={styles.headerMain}>
                <View style={{ ...styles.activeStatus }}></View>
                <View>
                    <Text style={{ color: Colors.headerColor, fontStyle: 'italic' }}>{isEnabled ? '(Available)' : "(Busy)"}</Text>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ color: 'gray', fontSize: hp('1.8%') }}>Phone No:</Text>
                        <Text style={{ color: Colors.headerColor }}>+923452271086</Text>
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ color: 'gray', fontSize: hp('1.8%') }}>Account No:</Text>
                        <Text style={{ color: Colors.headerColor }}>{selector?.accountNo}</Text>
                    </View>
                </View>
            </View>



        </View >

    );
};
