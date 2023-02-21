import React, { useEffect } from 'react';
import { View, Animated } from 'react-native'
import { styles } from './styles'
import { Constent } from '../../../constants/AppStyles';
import { Colors } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export function DialerDots(props) {
    const{isAnim}=props
    let point1 = new Animated.Value(1)
    let point2 = new Animated.Value(1)
    let point3 = new Animated.Value(1)
    let point4 = new Animated.Value(1)

    useEffect(()=>{
        isAnim? applyAnimation().start():stopAnimation()
    },[isAnim])

    const applyAnimation = () => {
  
           return Animated.parallel([
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
                        iterations: new Date()
                    }
                ),
            ])
        
    }

    const stopAnimation = () =>{
        point1.stopAnimation()
        point2.stopAnimation()
        point3.stopAnimation()
        point4.stopAnimation()
    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
        <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point1 }}></Animated.View>
        <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point2 }}></Animated.View>
        <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point3 }}></Animated.View>
        <Animated.View style={{ height: 15, width: 15, backgroundColor: '#fff', borderRadius: 100, margin: 2, opacity: point4 }}></Animated.View>
    </View>
    )
}