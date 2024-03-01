import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StyleSheet, Image, View, Pressable, Text, TextInput, Keyboard } from 'react-native'

import { useDispatch } from 'react-redux'
import { applyTimeInterval } from '../slices/SettingsSlice'

import settings from '../assets/settings.png'
import close from '../assets/close.png'

const Settings = () => {

    const [oppen, setOppen] = useState(false)
    const [timeInterval, setTimeInterval] = useState(0)

    const dispatch = useDispatch()

    const toggleDisplay = () => {
        setOppen(!oppen)
    }

    const applySettings = () => {
        timeInterval > 0 ? dispatch(applyTimeInterval(timeInterval)) : alert('интервал не может быть равень нулю!')
        timeInterval <= 1439 ? dispatch(applyTimeInterval(timeInterval)) : alert('интервал не может быть больше 23 часов 59 минут!')

        if (timeInterval > 0 && timeInterval <= 1439) {
            Keyboard.dismiss();
            setOppen(false)
        }
    }

    return (
        <Pressable style={styles.settings} onPress={() => Keyboard.dismiss()}>
            <Pressable style={styles.settings_btn} onPress={toggleDisplay}>
                {
                    !oppen
                        ?
                        <Image style={styles.settings_img} source={settings} />
                        :
                        <Image style={styles.settings_img} source={close} />
                }
            </Pressable>
            <View style={[styles.settings_list, { display: oppen ? 'block' : 'none' }]}>
                <View style={styles.settings_content_item}>
                    <Text style={styles.settings_name}>Интервал напоминаний:</Text>
                    <TextInput
                        style={styles.settings_input}
                        onChangeText={text => setTimeInterval(text)}
                        keyboardType='number-pad'
                        placeholder='Введите интервал'
                        placeholderTextColor="#e0e0e0"
                    />
                    <Pressable style={styles.settings_item_btn} onPress={applySettings}><Text style={styles.settings_btn_text}>применить</Text></Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    settings: {
        position: 'relative',
        backgroundColor: '#fff',
        zIndex: 9,
    },

    settings_btn: {
        position: 'absolute',
        zIndex: 10,
        top: hp('5%'),
        left: wp('6%'),
        padding: 5,
        borderRadius: 6
    },

    settings_list: {
        position: 'relative',
        top: 0,
        left: 0,
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center'
    },

    settings_content_item: {
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 2,
        borderStyle: 'solid',

        paddingBottom: 25,
        width: '90%',
    },

    settings_name: {
        fontSize: 20,
        marginBottom: hp('2%'),
        fontWeight: '600',
    },

    settings_input: {
        paddingVertical: 7,
        paddingLeft: 10,
        height: 40,
        backgroundColor: '#c4c4c4',
        borderRadius: 5,
        marginBottom: 15,
        color: '#fff',
        fontWeight: '600',
    },

    settings_item_btn: {
        paddingVertical: 10,
        width: 119,
        backgroundColor: '#F5D99A',
        borderRadius: 5

    },
    settings_btn_text: {
        textAlign: 'center'
    }
})

export default Settings