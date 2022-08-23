import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    gridView: { height: hp('18%'), width: hp('18%'), borderRadius: hp('1.5%'), backgroundColor: Colors.headerBase, margin: hp('1%'), ...Constent.insideCenter },
    barView: { height: hp('5%'), width: hp('38%'), borderRadius: hp('1.5%'), backgroundColor: Colors.headerBase, margin: hp('1%'), ...Constent.insideCenter },
    count: { color: Colors.purple, fontSize: hp('4%'), fontWeight: '800' },
    desc: { fontSize: hp('1.5%'), marginTop: 10 }
})