import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { StyleSheet, Text, View } from 'react-native'

const Settings = () => {
  return (
    <View style={styles.settings}>
        <Text>123</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    settings: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#fff',
        zIndex: 9
    }
})

export default Settings