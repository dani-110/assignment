import {Platform} from 'react-native';

export const Fonts = {
  MontserratRegular:
    Platform.OS == 'ios' ? 'Montserrat-Regular' : 'Montserrat Regular',
  MontserratSemiBold:
    Platform.OS == 'ios' ? 'Montserrat-SemiBold' : 'Montserrat SemiBold',
  MontserratBold: Platform.OS == 'ios' ? 'Montserrat-Bold' : 'Montserrat Bold',
  MontserratMedium:
    Platform.OS == 'ios' ? 'Montserrat-Medium' : 'Montserrat Medium',
};
