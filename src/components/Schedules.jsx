import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { addNowIndex, toggleEnded } from '../slices/MainSlice'
import Clock from './Clock'

import StringToMinutes from '../utils/StringToMinutes'

const Schedules = ({ navigation }) => {

    const { hourses, minutes } = useSelector(state => state.clock);
    const { schedules, formatedTime, nowIndex, ended } = useSelector(state => state.main);
    const { duration, currentTime, startTime } = useSelector(state => state.indicator)

    const dispatch = useDispatch();


    useEffect(() => {

        schedules.forEach((el, i) => {
            const { StartTime, EndTime } = StringToMinutes(i, schedules);

            if (currentTime >= StartTime && currentTime < EndTime) {
                dispatch(addNowIndex(i));
            } else if (schedules.length > 1) {
                dispatch(addNowIndex(schedules.length - 2))
            }
        })

        if (currentTime >= StringToMinutes(schedules.length - 1, schedules).EndTime) {
            dispatch(toggleEnded(true));
        } else {
            dispatch(toggleEnded(false));
        }

    }, [hourses, minutes, schedules])

    const Redirect = (path) => {
        navigation.navigate(path, { name: path })
    }

    return (
        <View style={styles.main}>
            {
                !ended
                    ?
                    <Text style={styles.main_text}>расписание</Text>
                    :
                    <View>
                        <Text style={styles.main_text} >Расписание подошло к концу</Text>
                        <Pressable
                            onPress={() => Redirect('Start')}
                            style={styles.back}
                        >
                            <Text>назад</Text>
                        </Pressable>
                    </View>
            }
            <ScrollView style={styles.main_scroll}>
                {
                    schedules.map((time, i) => {
                        let now = nowIndex == i && currentTime >= startTime;
                        if (ended) return;
                        return (
                            <View
                                key={i}
                                style={
                                    now ?
                                        [styles.main_list_item, styles.main_list_item_active]
                                        :
                                        styles.main_list_item
                                }
                            >
                                <View style={[styles.main_item_top, now ? { flexDirection: 'row' } : {}]}>
                                    <View>
                                        <Text style={
                                            now ?
                                                [styles.main_list_now, styles.active]
                                                :
                                                styles.main_list_now
                                        }>
                                            сейчас
                                        </Text>
                                    </View>

                                    <Text style={styles.main_item_text}>{time[0]} - {time[1]}</Text>
                                </View>

                                <View style={[styles.duration_wrapper, now ? { paddingTop: hp('1%') } : {}]}>

                                    {now ? <Text style={styles.duration_text}>длительность: {Math.trunc(duration / 60)} ч. {duration % 60} м.</Text> : null}

                                    <Text style={styles.duration}></Text>

                                </View>
                            </View>

                        )
                    })
                }
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({

    main: {
        marginTop: 50,
    },

    main_text: {
        textAlign: 'center',
        fontSize: hp('3%'),
        fontWeight: '700',

        marginTop: hp('0%'),
        marginBottom: 50
    },

    main_scroll: {
        position: 'absolute',
        top: '90%',
        left: '10%',
        height: 300,
    },

    main_item_top: {
        justifyContent: 'space-between',
        width: '100%'
    },

    main_list_item: {
        width: 200,
        height: hp('8.5%'),
        borderRadius: 10,

        backgroundColor: '#DDD8D4',

        paddingHorizontal: 15,

        marginLeft: 10,
        marginBottom: 10,

        justifyContent: 'center',
    },

    main_list_item_active: {
        backgroundColor: '#F5D99A',

        width: wp('80%'),

        paddingVertical: 10,
    },

    main_item_text: {
        fontSize: 20,
        fontWeight: '800',
        paddingRight: 15,
    },

    main_item_subtext_wrapper: {
        flexDirection: 'row',
    },

    main_item_subtext: {
        fontWeight: '400',
        paddingRight: 15,
    },

    duration_wrapper: {
        flexDirection: 'row',
    },

    duration_text: {
        marginRight: 10,
    },

    duration: {
        fontWeight: '700',
    },

    main_list_now: {
        opacity: 0,
        width: 0,
        height: 0,
        fontWeight: '700',
        fontSize: hp('2%')
    },

    active: {
        opacity: 1,
        width: 'auto',
        height: 'auto',
    },

    ended_text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700'
    },

    back: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

export default Schedules