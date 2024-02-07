import { Image, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Dimensions } from 'react-native'


import footer from '../assets/footer.png'

const Footer = () => {
    return (
        <Image style={styles.footer} source={footer}></Image>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        // bottom: Dimensions.get('window').width > 500 ? hp('0%') : hp('0%'),
        top: hp('87%'),
        width: wp('100%')
    }
})

export default Footer;