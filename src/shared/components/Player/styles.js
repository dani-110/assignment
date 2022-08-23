import { StyleSheet } from 'react-native'
import { Colors } from '../../../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    main: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.pink, padding: 10, borderRadius: 15 },
    thumbSize: { height: hp('1.5%'), width: hp('1.5%') },
    thumbView: {
        height: hp('1%'),
        width: hp('1%'),
        backgroundColor: Colors.black,

    },
    slideView: {
        width: wp('50%'),
        alignSelf: 'center',
    },
    icon: { marginRight: hp('0.5%') }
})