import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    codeFieldRoot: {
        // marginTop: hp('2%'),
        width: 250,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // borderBottomColor: '#ccc',
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
    cellText: {
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
    },
})