import React from 'react';
import { View, Text, FlatList, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { Constent } from '../../../constants/AppStyles';
import { Colors } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export function Dialer(props) {
    const {
        dialNumber,
        backspace,
        applyAnimation,
        isAnim,
        callEnd,
        openDialer,
        isDialerOpen
    } = props
    const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
    const alpha = ["", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ", "", "+", ""];
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => dialNumber(item)} onLongPress={() => { alpha[index] == '+' ? dialNumber(alpha[index]) : null }} style={styles.btn}>
            <Text style={{ fontSize: 30 }}>{item}</Text>
            <Text style={{ opacity: 0.8 }}>{alpha[index]}</Text>
        </TouchableOpacity>
    )

    const dailerBottomTabs = () => (
        <View style={styles.dialerTabs}>
            <View style={styles.callView}>
                <Icon
                    name='local-phone'
                    size={25}
                    color={'transparent'}
                />
            </View>
            <View style={styles.callView}>
                {
                    !isAnim ?
                        <TouchableOpacity onPress={applyAnimation} style={styles.call}>
                            <Icon
                                name='local-phone'
                                size={40}
                                color={Colors.headerColor}
                            />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={callEnd} style={{ ...styles.call, backgroundColor: Colors.busy }}>
                            <Icon
                                name='call-end'
                                size={40}
                                color={Colors.headerColor}
                            />
                        </TouchableOpacity>
                }
            </View>
            <View style={styles.callView}>
                {
                    !isAnim ?
                        <TouchableOpacity onPress={() => backspace()}>
                            <Icon
                                name='backspace'
                                size={25}
                            />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => openDialer(isDialerOpen ? '0%' : '65%')}>
                            <Icon
                                name='dialpad'
                                size={25}
                            />
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
    return (
        <View style={{ flex: 1, ...Constent.insideCenter }}>
            <FlatList
                data={buttons}
                // keyExtractor={}     //has to be unique   
                renderItem={renderItem} //method to render the data in the way you want using styling u need
                horizontal={false}
                numColumns={3}
            />
            {dailerBottomTabs()}

        </View>
    )
}