import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    iconsView: { justifyContent: 'space-around', flexDirection: 'row', paddingVertical: hp('2%') },
})