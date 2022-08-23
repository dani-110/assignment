import React, { useEffect } from 'react';
import { View, Animated, Easing, Text, FlatList, SafeAreaView, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, TextInput } from 'react-native'
import { styles } from './dialer.styles'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { IconTab } from '../../shared/components/IconsTab/iconsTab';
import { Dialer } from '../../shared/components/dialer/dialer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BkcView } from '../../shared/components/BkcView/bkcView';

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
        setIsDialerOpen
    } = props

    let height = new Animated.Value(hp('0%'))

    let point1 = new Animated.Value(1)
    let point2 = new Animated.Value(1)
    let point3 = new Animated.Value(1)
    let point4 = new Animated.Value(1)
    const applyAnimation = () => {
        if (number) {
            Animated.parallel([
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(point1, {
                            toValue: 0.2,
                            duration: 300
                        }),
                        Animated.timing(point2, {
                            toValue: 0.2,
                            duration: 300
                        }),
                        Animated.timing(point3, {
                            toValue: 0.2,
                            duration: 300
                        }),
                        Animated.timing(point4, {
                            toValue: 0.2,
                            duration: 300
                        }),
                    ]),
                    {
                        iterations: point1 + 1
                    }
                ),
                Animated.timing(height, {
                    toValue: hp('65%'),
                    duration: 250
                })
            ]).start((res) => {
                makeCall()
                console.log(res)
            })
        }
    }

    const callEnd = () => {
        point1.stopAnimation()
        point2.stopAnimation()
        point3.stopAnimation()
        point4.stopAnimation()
        Animated.timing(height, {
            toValue: hp('0%'),
            duration: 250
        }).start(makeCall)
    }

    const makeCall = () => {
        setIsAnim(isAnim ? false : true)
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
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                                <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point1 }}></Animated.View>
                                <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point2 }}></Animated.View>
                                <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point3 }}></Animated.View>
                                <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point4 }}></Animated.View>
                            </View>
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
                isDialerOpen={isDialerOpen}
            />
        </View>
    )
}