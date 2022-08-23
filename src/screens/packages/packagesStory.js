//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { styles } from './packages.styles';
import { Constent } from '../../constants/AppStyles';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { ScrollView } from 'react-native-gesture-handler';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// create a component
export const PackagesStory = (props) => {

    const mainView = (name, details, usersLimit) => (
        <View style={styles.mainView}>
            <View style={{ marginVertical: hp('2%') }}>
                <Text style={{ ...styles.mainHeader, color: '#FFD200', }}>{name} Package</Text>
                <Text style={{ ...styles.mainHeader, color: '#fff', }}>{details}</Text>

            </View>

            <View style={{ paddingLeft: wp('6%') }}>
                <Text style={styles.points}>{'\u2981' + '  ' + `User Limit: ${usersLimit} User`}</Text>
                <Text style={styles.points}>{'\u2981' + '  ' + 'Make and receive calls'}</Text>
                <Text style={styles.points}>{'\u2981' + '  ' + 'Send and receive SMS'}</Text>
                <Text style={styles.points}>{'\u2981' + '  ' + `Call recording & playback`}</Text>
                <Text style={styles.points}>{'\u2981' + '  ' + 'Voicemails'}</Text>
                <Text style={styles.points}>{'\u2981' + '  ' + 'View call and messaging statistics'}</Text>
            </View>
            <View style={{ marginVertical: hp('2%'), ...Constent.insideCenter }}>
                <DoneButton text={'Subscribe'} colors={['#9C00FF', '#9C00FF']} style={{ width: '50%' }} />
            </View>
        </View>
    )
    return (
        <BkcView >
            <ScrollView style={styles.scroll}>
                {mainView('3-Day Trail', 'Free!*', 1)}
                {mainView('Basic', '$2.99 Per Month*', 1)}
                {mainView('Standard', '$5.99 Per Month*', 3)}
                {mainView('Premium', '$9.99 Per Month*', 10)}

                <Text style={styles.bottomText}>
                    {'*Please note that the subscription fee is for the\n mobile app only and does not cover calling or SMS\ncharges. Calling and SMS charges would be billed\n separately on your Twilio account.'}
                </Text>
            </ScrollView>
        </BkcView>
    )
}