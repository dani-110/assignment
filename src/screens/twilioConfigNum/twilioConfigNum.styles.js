import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    barView: { height: hp('5%'), width: hp('38%'), borderRadius: hp('1.5%'), backgroundColor: Colors.headerBase, margin: hp('1%'), ...Constent.insideCenter },
    firstView: { flex: 1, ...Constent.insideCenter },
    main: { flex: 1, paddingHorizontal: hp('5%'), justifyContent: 'center' },
    input: { marginVertical: hp('0.5%'), width: '100%' },
    forgot: { color: '#fff', ...Constent.mainFont, fontWeight: '500' },
    forgotView: { marginVertical: hp('3%') },
    signUp: { color: '#7167FC', ...Constent.mainFont, fontWeight: '500' },
    signUpView: { flexDirection: 'row', marginVertical: hp('2%') },
    signUpText: { color: '#fff', ...Constent.mainFont },
    checkBoxView: { marginVertical: hp('2%'), flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: wp('3%') },
    checkBox: { alignSelf: 'center', marginRight: wp('3%') },
    card: { width: Dimensions.get('screen').width - 50, backgroundColor: 'transparent' },
    cardHeader: { marginVertical: hp('2%'), fontSize: hp('4%') },
    btnView: { marginTop: hp('2%'), width: '100%', ...Constent.insideCenter },
    bottomDesc: { textAlign: 'center', color: Colors.headerColor, fontSize: hp('2%'), fontWeight: '400', marginVertical: hp('1%') },
    check: { borderRadius: 100, height: hp('2%'), width: hp('2%'), backgroundColor: '#9c00ff3d', ...Constent.insideCenter }
})