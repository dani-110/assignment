import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    firstView: { flex: 1, ...Constent.insideCenter },
    main: { flex: 1, paddingHorizontal: hp('2%'), justifyContent: 'center' },
    input: { marginVertical: hp('2%'), width: '100%' },
    forgot: { color: '#fff', ...Constent.mainFont, fontWeight: '500' },
    forgotView: { marginVertical: hp('3%') },
    signUp: { color: '#7167FC', ...Constent.mainFont, fontWeight: '500' },
    signUpView: { flexDirection: 'row', marginVertical: hp('2%') },
    signUpText: { color: '#fff', ...Constent.mainFont },
    checkBoxView: { marginVertical: hp('2%'), flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: wp('3%') },
    checkBox: { alignSelf: 'center', marginRight: wp('3%') },
    card: { width: Dimensions.get('screen').width - 50, backgroundColor: 'transparent' },
    cardHeader: { marginVertical: hp('2%') },
    btnView: { marginTop: hp('2%'), width: '100%', ...Constent.insideCenter },
    resend: { textDecorationLine: 'underline', fontSize: hp('2%'), color: Colors.headerColor, fontWeight: '500', },
    bottomDesc: { textAlign: 'center', color: Colors.headerColor, fontSize: hp('2%'), fontWeight: '400', marginBottom: hp('1%') }
})