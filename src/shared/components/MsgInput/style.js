import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Constent } from '../../../constants/AppStyles';
import { Colors } from '../../../constants/colors';
export const styles = StyleSheet.create({
    bottomMain: {
        width: '100%',
        ...Constent.insideCenter,
        // padding: hp('1%'),
    },
    inputContainer: {
        width: '90%',
        minHeight: hp('6%'),
        flexDirection: 'row',
        marginBottom: hp('2%'),
    },
    input: {
        flex: 1, justifyContent: 'center', paddingHorizontal: wp('4%'),
        backgroundColor: Colors.headerBase,
        marginRight: hp('0.5%'),
        minHeight: hp('6%'),
        borderRadius: hp('2%'),
        padding: hp('0.5%'),
        paddingHorizontal: hp('1%')
    },
    send: { justifyContent: 'center', alignItems: 'center', height: hp('4%'), width: hp('4%'), borderRadius: hp('50%') },
    inputText: { minHeight: ('2%'), maxHeight: hp('8%') }
})