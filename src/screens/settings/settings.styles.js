import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: wp('3%'), backgroundColor: '#fff' },
    input: { marginVertical: hp('1.5%'), width: '100%' },
    headerView: { padding: hp('2%') },
    headerTxt: { color: Colors.purple, fontSize: hp('2.5%'), fontWeight: '600' },
    iconsView: { justifyContent: 'space-around', flexDirection: 'row', paddingVertical: hp('2%') },
    passView: { flexDirection: 'row', borderRadius: hp('1%'), height: 40, backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'space-between', padding: 5 },
    passBtn: { borderRadius: hp('1%'), height: '100%', backgroundColor: Colors.purple, width: '30%', ...Constent.insideCenter, },
    btnView: { width: '100%', ...Constent.insideCenter },
})