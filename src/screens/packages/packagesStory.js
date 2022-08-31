//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { DataInput } from '../../shared/components/DataInput/dataInput';
import { styles } from './packages.styles';
import { Constent } from '../../constants/AppStyles';
import { DialogBox } from '../../shared/components/dialogBox/dialogBox';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { DoneButton } from '../../shared/components/DoneButton/doneButton';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Images } from '../../assets/assetsPath';

// create a component
export const PackagesStory = (props) => {
    const {
        gotoConnectBusiness
    } = props

    const mainView = (name, details, usersLimit) => (
        <View style={styles.mainView}>
            <View style={{ marginVertical: hp('2%') }}>
                <View style={{ flexDirection: 'row', ...Constent.insideCenter }}>
                    {
                        name == '3-Day Trail' ?
                            <Image source={Images.checkList} style={{ height: 20, width: 20, marginRight: 2 }} />
                            : null
                    }

                    <Text style={{ ...styles.mainHeader, color: '#FFD200', }}>{name} Package</Text>
                </View>
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
                <DoneButton text={name == '3-Day Trail' ? 'Active' : 'Subscribe'} colors={name == '3-Day Trail' ? ['#730080', '#730080'] : ['#9C00FF', '#9C00FF']} style={{ width: '50%' }} />
            </View>
        </View>
    )
    return (
        <BkcView >
            <ScrollView style={styles.scroll}>
                <TouchableOpacity onPress={gotoConnectBusiness}>
                    <Text style={{ textAlign: 'right', color: '#fff', textDecorationLine: 'underline' }}>Connect to a business account</Text>
                </TouchableOpacity>
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