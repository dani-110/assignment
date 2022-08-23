import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    main: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#A4A4A4' },
    unread: { height: hp('3%'), width: hp('3%'), backgroundColor: Colors.unread, borderRadius: hp('100%'), ...Constent.insideCenter },
    unreadText: { color: Colors.headerColor, fontSize: hp('1.5%'), fontWeight: '500' }
})