import { StyleSheet } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    options: { height: hp('5%'), width: hp('5%'), borderRadius: hp('1%'), margin: hp('1%'), ...Constent.insideCenter, flexDirection: 'row' }
})