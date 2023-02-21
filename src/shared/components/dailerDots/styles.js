import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Constent } from '../../../constants/AppStyles';
import { Colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
    btn: { height: hp('10%'), width: hp('10%'), backgroundColor: Colors.gridBase, borderRadius: hp('3%'), marginHorizontal: wp('3%'), marginVertical: hp('1%'), ...Constent.insideCenter },
    callView: { height: hp('10%'), width: hp('10%'), marginHorizontal: wp('3%'), marginVertical: hp('1%'), ...Constent.insideCenter },
    call: { ...Constent.insideCenter, height: hp('8%'), width: hp('8%'), borderRadius: hp('100%'), backgroundColor: '#45BC51' },
    dialerTabs: { flexDirection: 'row', position: 'absolute', bottom: hp('10%') }
})