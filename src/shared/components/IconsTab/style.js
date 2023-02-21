import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    iconsView: { justifyContent: 'space-around', flexDirection: 'row', paddingTop: hp('2%'), paddingBottom: hp('3%'), backgroundColor: '#fff' },
})