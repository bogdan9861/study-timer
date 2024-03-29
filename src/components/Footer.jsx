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
        top: hp('87%'),
        width: wp('100%'),
        zIndex: -1
    }
})

export default Footer;