import React, { useEffect } from 'react';
import { View, Animated, NativeModules, Text, FlatList, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, TextInput } from 'react-native'
import { styles } from './dialer.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';
import { Dialer } from '../../shared/components/dialer/dialer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BkcView } from '../../shared/components/BkcView/bkcView';
import { DialerDots } from '../../shared/components/dailerDots/dialerDots';

export const DialerStory = (props) => {
    const {
        number,
        dialNumber,
        backspace,
        cursor,
        setCursor,
        isAnim,
        setIsAnim,
        isDialerOpen,
        setIsDialerOpen,
        callStart
    } = props

    let height = new Animated.Value(hp('0%'))
    let rotate = new Animated.Value(hp('0%'))

    let point1 = new Animated.Value(1)
    let point2 = new Animated.Value(1)
    let point3 = new Animated.Value(1)
    let point4 = new Animated.Value(1)
    const applyAnimation = () => {
        Animated.timing(height, {
            toValue: hp('65%'),
            duration: 250
        }).start(makeCall)
        // makeCall()

        // if (number) {
        //     Animated.parallel([
        //         Animated.loop(
        //             Animated.sequence([
        //                 Animated.timing(point1, {
        //                     toValue: 0.2,
        //                     duration: 300
        //                 }),
        //                 Animated.timing(point2, {
        //                     toValue: 0.2,
        //                     duration: 300
        //                 }),
        //                 Animated.timing(point3, {
        //                     toValue: 0.2,
        //                     duration: 300
        //                 }),
        //                 Animated.timing(point4, {
        //                     toValue: 0.2,
        //                     duration: 300
        //                 }),
        //             ]),
        //             {
        //                 iterations: point1 + 1
        //             }
        //         ),
        //         Animated.timing(height, {
        //             toValue: hp('65%'),
        //             duration: 250
        //         }),

        //     ]).start(makeCall)
        // }
    }

    const callEnd = () => {
        Animated.timing(height, {
            toValue: hp('0%'),
            duration: 250
        }).start(makeCall)
    }

    const makeCall = () => {
        setIsAnim(isAnim ? false : true)
        callStart()
       
    }
    const openDialer = (val) => {
        Animated.timing(height, {
            toValue: hp(val),
            duration: 250
        }).start(dialShow)
    }

    const dialShow = () => {
        setIsDialerOpen(isDialerOpen ? false : true)
    }
    const inputView = () => (
        <Animated.View style={{ ...styles.topView, position: 'absolute', zIndex: 100, height: height }}>
            <BkcView>

                <View style={{ flex: 1, ...Constent.insideCenter }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: 50 }}>
                        <Text style={{ color: Colors.headerColor, fontSize: 40, fontWeight: '700' }}>{number}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: Colors.headerColor, fontSize: 25 }}>Dialing...</Text>

{
    isAnim? <DialerDots isAnim={isAnim} />:null
}
                           
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <TouchableOpacity style={{ margin: 20 }}>
                                <Icon
                                    name='pause'
                                    color={'#fff'}
                                    size={30}

                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 20 }}>
                                <Icon
                                    name='mic'
                                    color={'#fff'}
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 20 }}>
                                <Icon
                                    name='volume-up'
                                    color={'#fff'}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </BkcView>
        </Animated.View>
    )
    return (
        <View style={{ flex: 1, }}>
            <View style={styles.topView}>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginHorizontal: 20 }}>
                    <Text style={{ color: Colors.headerColor, fontSize: 35, fontWeight: '700' }}>{number}</Text>
                </View>
            </View>
          {inputView()}
            <Dialer
                isAnim={isAnim}
                dialNumber={dialNumber}
                backspace={backspace}
                applyAnimation={() => { applyAnimation() }}
                callEnd={callEnd}
                openDialer={openDialer}
                makeCall={makeCall}
                isDialerOpen={isDialerOpen}
            />
        </View>
    )
}