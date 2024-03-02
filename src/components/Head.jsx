import React, { useEffect } from 'react'
import { Image, View, StyleSheet, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Dimensions } from 'react-native'

import blot from '../assets/header.png'
import logo from '../assets/logo.png'


const Head = () => {

  return (
    <View style={styles.header_logo_wrapper}>
      <Image style={styles.header_img} source={blot} />
      <Image style={styles.header_logo} source={logo} />
    </View>
  )
}

const styles = StyleSheet.create({

  header_img: {
    width: wp('100%'),
  },

  header_logo: {
    position: 'absolute',
    top: '25%',
    left: Dimensions.get('window').width > 500 ? wp('23%') : wp('13%'),
  }
})

export default Head