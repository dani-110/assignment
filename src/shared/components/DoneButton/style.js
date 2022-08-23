import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    text: {
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'center',
        fontSize: hp('2%')
    },
    btn: {
        width: '100%',
        height: hp('5%'),
    },
    view: {
        height: '100%',
        width: '100%',
        borderRadius: hp('1.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: hp('1%'),
    },
    bckImg: {
        // width: '100%',
        position: 'absolute',
        borderRadius: hp('1.5%')
    }
})