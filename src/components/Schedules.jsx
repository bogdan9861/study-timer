import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { addFormatedTime, addNowIndex, toggleEnded } from '../slices/MainSlice'
import replace from '../utils/replace'

import AddZero from '../utils/AddZero'

const Schedules = () => {

    const { hourses, minutes } = useSelector(state => state.clock);
    const { schedules, formatedTime, nowIndex, ended } = useSelector(state => state.main);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(addFormatedTime(Number(replace(`${AddZero(hourses)}:${AddZero(minutes)}`))))

        schedules.forEach((time, i) => {
            if (formatedTime >= Number(replace(time[0])) && formatedTime < Number(replace(time[1]))) {
                dispatch(addNowIndex(i));
            }
        })

        if (formatedTime > Number(replace(schedules[schedules.length - 1][1]))){
            dispatch(toggleEnded(true));
        }else {
            dispatch(toggleEnded(false));
        }

    }, [formatedTime, schedules, hourses, minutes])

    return (
        <View style={styles.main}>
            <Text style={styles.main_text}>{!ended ? 'расписние:' : 'пары закончились!'} </Text>
            <ScrollView style={styles.main_scroll}>
                {
                    schedules.map((time, i) => {
                        if (ended) return;
                        return (
                            <View
                                key={i}
                                style={
                                    nowIndex == i ?
                                        [styles.main_list_item, styles.main_list_item_active]
                                        :
                                        styles.main_list_item
                                }
                            >
                                <Text style={
                                    nowIndex == i ?
                                        [styles.main_list_now, styles.active]
                                        :
                                        styles.main_list_now
                                }>
                                    сейчас
                                </Text>
                                <View>
                                    <Text style={styles.main_item_text}>{time[0]} - {time[1]}</Text>
                                    <View style={styles.main_item_subtext_wrapper}>
                                        <Text
                                            style={
                                                nowIndex == i ?
                                                    [styles.main_item_subtext, { textAlign: 'right' }]
                                                    :
                                                    styles.main_item_subtext
                                            }
                                        >
                                            {
                                                i % 2 == 0 ? 'пара' : 'перемена'
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    main: {

    },

    main_text: {
        textAlign: 'center',
        fontSize: 27,
        fontWeight: '700',
        marginBottom: 50
    },

    main_scroll: {
        position: 'absolute',
        top: '90%',
        left: '10%',
        height: 300,
    },

    main_list_item: {
        width: 200,
        height: 70,
        borderRadius: 10,

        backgroundColor: '#DDD8D4',

        paddingHorizontal: 15,

        marginLeft: 10,
        marginBottom: 10,
    },

    main_list_item_active: {
        backgroundColor: '#F5D99A',

        width: '80%',

        flexDirection: 'row',
        justifyContent: 'space-between',

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

    main_item_index: {
        width: 25,
        height: 25,

        backgroundColor: '#FFF',
        borderRadius: 15,

        padding: 1,
        textAlign: 'center'
    },

    main_list_now: {
        opacity: 0,
    },

    active: {
        opacity: 1,
    },

    ended_text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700'
    },
})

export default Schedules