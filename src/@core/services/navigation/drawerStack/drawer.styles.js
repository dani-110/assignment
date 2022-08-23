import { StyleSheet } from 'react-native'
import { Colors } from '../../../../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Constent } from '../../../../constants/AppStyles';

export const styles = StyleSheet.create({
    label: { color: Colors.headerColor, ...Constent.mainFont, marginLeft: -wp('3%') },
    headerMain: { flexDirection: 'row', justifyContent: 'space-between', padding: hp('1%'), marginBottom: hp('2%') },
    activeStatus: { height: hp('2%'), width: hp('2%'), borderRadius: hp('100%'), marginHorizontal: wp('1.5%') },
    contentMain: { flex: 1, backgroundColor: '#000' },
    bottomView: { height: hp('18%'), width: '100%', position: 'absolute', bottom: 0 },
    companyName: { color: Colors.headerColor, ...Constent.mainFont, fontWeight: '300' },
    privacy: { color: Colors.headerColor, textDecorationLine: 'underline', marginRight: wp('1.5%') }
})