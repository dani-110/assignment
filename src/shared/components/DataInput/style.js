import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    main: {
        borderWidth: 0,
        borderBottomWidth: hp('1%'),
        backgroundColor: 'transparent',
        borderBottomColor: '#eae7e7',
        width: Dimensions.get('window').width - 50,
        marginBottom: hp('2%')
    }
})