import { StyleSheet, Dimensions } from 'react-native'
import { Constent } from '../../constants/AppStyles'
import { Colors } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    main: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#A4A4A4' },
    unread: { height: hp('3%'), width: hp('3%'), backgroundColor: Colors.unread, borderRadius: hp('100%'), ...Constent.insideCenter },
    unreadText: { color: Colors.headerColor, fontSize: hp('1.5%'), fontWeight: '500' },
    contentText: { fontSize: hp('2%'), marginVertical: hp('0.5%'), color: '#000' },
    suggestions: {
        height: hp('30%'), width: '90%',
        borderBottomRightRadius: hp('1%'),
        borderBottomLeftRadius: hp('1%'),
        backgroundColor: "#fdfdfd",
        shadowColor: "#757575",
        shadowRadius: 5,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        padding: 10
    },
    input: { marginVertical: hp('1.5%'), width: '100%' },
})