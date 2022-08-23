import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    topView: { backgroundColor: Colors.purple, width: '100%', height: hp('12%'), borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%'), marginBottom: hp('5%') },
    ring: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "tomato",
        borderWidth: 10,
    },
})