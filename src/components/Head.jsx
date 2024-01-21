import React from 'react'

import blot from '../assets/header.png'
import logo from '../assets/logo.png'

import { Image, View, StyleSheet, SafeAreaView } from 'react-native'

const Head = () => {
  return (
      <View style={styles.header_logo_wrapper}>
        <Image style={styles.header_img} source={blot} />
        <Image style={styles.header_logo} source={logo} />
      </View>
  )
}

const styles = StyleSheet.create({

  header_logo_wrapper: {

  },

  header_img: {
    width: '100%',
  },

  header_logo: {
    position: 'absolute',
    left: '12%',
    top: '25%'
  }
})

export default Head