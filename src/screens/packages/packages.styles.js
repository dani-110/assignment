import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    mainView: { borderWidth: hp('0.2%'), borderColor: Colors.headerBase, padding: hp('1%'), borderRadius: hp('2%'), marginVertical: hp('1%') },
    mainHeader: { textAlign: 'center', fontSize: hp('2.5%'), fontWeight: '600', },
    points: { color: Colors.headerColor, fontSize: hp('1.8%') },
    scroll: { flex: 1, paddingHorizontal: wp('5%'), marginVertical: hp('1%') },
    bottomText: { textAlign: 'center', color: Colors.headerColor, marginVertical: hp('2%') }
})