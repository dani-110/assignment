import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: { flex: 1, padding: hp('2%') },
    optionView: { backgroundColor: Colors.purple, ...Constent.insideCenter, width: wp('18%'), borderRadius: hp('2%'), marginHorizontal: hp('0.5%') },
    optionText: { color: Colors.headerColor, fontSize: hp('1.8%'), fontWeight: '500', textAlign: 'center' },
    mainView: { backgroundColor: Colors.headerBase, padding: hp('1%'), borderRadius: hp('1%'), flexDirection: 'row', marginVertical: hp('0.5%') },
    contentText: { fontSize: hp('2%'), marginVertical: hp('0.5%'), fontWeight: '600', color: '#000' },
    input: { marginTop: hp('2%'), width: '100%' },
})