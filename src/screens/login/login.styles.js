import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    firstView: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
    secondView: { flex: 2, ...Constent.insideCenter, paddingVertical: hp('2%') },
    input: { marginVertical: hp('1.5%'), width: '90%' },
    forgot: { color: '#fff', ...Constent.mainFont, fontWeight: '500' },
    forgotView: { marginVertical: hp('3%') },
    signUp: { color: '#9C01FF', ...Constent.mainFont, fontWeight: '500' },
    signUpView: { flexDirection: 'row', marginVertical: hp('2%') },
    signUpText: { color: '#fff', ...Constent.mainFont },
    checkBoxView: { marginBottom: hp('2%'), flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: wp('1%') },
    checkBox: { alignSelf: 'center', marginRight: wp('3%') },
    card: { width: Dimensions.get('screen').width - 50, backgroundColor: Colors.black },
    cardHeader: { marginVertical: hp('2%') }
})