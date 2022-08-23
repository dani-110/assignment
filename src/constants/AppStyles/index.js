import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const insideCenter = {
    justifyContent: 'center',
    alignItems: 'center'
}

const cardHeader = {
    fontSize: hp('2.5%'),
    fontWeight: '500'
}

const mainFont = {
    fontSize: hp('2%')
}

const desc = {
    textAlign: 'center',
    color: '#fff',
    fontSize: hp('3%'),
    fontWeight: '300',
    marginBottom: hp('1%')
}

const counterCircle = {
    height: hp('5%'), width: hp('5%'),
}

const msgText = {
    fontSize: hp('1.8%'),
    fontWeight: '500',
}
export const Constent = {
    insideCenter,
    cardHeader,
    mainFont,
    desc,
    counterCircle,
    msgText
}