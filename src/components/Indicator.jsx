import { Pressable, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { setDuration, setRemainedToStart, setCurrentTime, setStartTime } from "../slices/IndicatorSlice"
import { applyTimeInterval } from "../slices/SettingsSlice"

import { useNotifications } from "../utils/useNotifications"
import StringToMinutes from "../utils/StringToMinutes"

const Indicator = () => {

    const { nowIndex, schedules, ended } = useSelector(state => state.main)
    const { hourses, minutes } = useSelector(state => state.clock)
    const { duration, remainedToStart, currentTime, startTime } = useSelector(state => state.indicator)
    const { timeInterval } = useSelector(state => state.settings)

    const [endTime, setEndTime] = useState(0)
    const [nextMinutes, setNextMinutes] = useState(0)
    const [remained, setRemained] = useState(0)

    const dispatch = useDispatch()
    const notification = useNotifications()

    useEffect(() => {
        dispatch(setCurrentTime(Number(hourses) * 60 + Number(minutes)))
    }, [hourses, minutes])

    useEffect(() => {
        const { StartTime, EndTime } = StringToMinutes(nowIndex, schedules)

        dispatch(setStartTime(StartTime))
        setEndTime(EndTime)
    }, [currentTime])


    useEffect(() => {

        setRemained(remained => endTime - currentTime)
        dispatch(setDuration(endTime - startTime))

        let step = nowIndex + 1 < schedules.length ? 1 : 0

        setNextMinutes(StringToMinutes(nowIndex + step, schedules).StartTime)

        if (currentTime >= endTime && currentTime < nextMinutes && schedules.length > 1) {
            dispatch(setRemainedToStart(nextMinutes - currentTime))
        } else if (nowIndex == 0 && currentTime < startTime) {
            dispatch(setRemainedToStart(startTime - currentTime))
        } else if (currentTime >= startTime && currentTime < endTime) {
            dispatch(setRemainedToStart(0))
        }

    }, [currentTime, endTime, remained, remainedToStart, nowIndex, schedules])


    useEffect(() => {

        if (remainedToStart > 0 && remainedToStart % timeInterval == 0 && !ended) {
            notification.sendNotification(
                'Обратите внимание',
                `до начала события ${schedules[nowIndex][0]} - ${schedules[nowIndex][1]} осталось ${Math.trunc(remainedToStart / 60)}ч. ${remainedToStart % 60}м.`
            )
        }

        if (remainedToStart == 0 && duration % timeInterval == 0 && !ended) {
            notification.sendNotification(
                'Обратите внимание',
                `до завершения события ${schedules[nowIndex][0]} - ${schedules[nowIndex][1]} осталось ${Math.trunc(remained / 60)} ч. ${remained % 60} м.`
            )
        }

    }, [remained, remainedToStart, schedules, nowIndex, timeInterval])


    const calcPercentsToEnd = () => {

        if (remainedToStart > 0 && schedules.length > 1 && currentTime > endTime) {
            return Math.floor(((currentTime - endTime) / (nextMinutes - endTime)) * 100);
        } else if (nowIndex == 0 && currentTime < startTime) {
            return undefined
        } else {
            return Math.floor(remained / duration * 100);
        }

    }

    return (
        !ended ?
            <View style={styles.indicator}>
                <Text style={styles.indicator_title}>
                    {
                        remainedToStart > 0 ? 'до начала:' : 'до конца:'
                    }
                </Text>
                <Text style={[styles.indicator_time, calcPercentsToEnd() == undefined ? null : { marginBottom: hp('5%') }]}>
                    {
                        remainedToStart > 0
                            ? `${Math.trunc(remainedToStart / 60)}ч ${remainedToStart % 60}м`
                            : `${Math.trunc(remained / 60)}ч ${remained % 60}м`
                    }
                </Text>
                {
                    calcPercentsToEnd() == undefined ? null :
                        <View>
                            <View style={styles.indicator_inner}>
                                <Text style={styles.indicator_percents}>
                                    {calcPercentsToEnd() + '%'}
                                </Text>

                                <View style={styles.indicator_parent}>
                                    <View style={styles.indicator_backlayer}></View>
                                    <View
                                        style={[
                                            styles.indicator_frontlayer,
                                            {
                                                width: remainedToStart > 0
                                                    ? calcPercentsToEnd() + '%'
                                                    : duration != 0 ? Math.floor(remained / duration * 100) + '%' : 0
                                            }
                                        ]}
                                    />
                                </View>

                            </View>
                        </View>
                }

            </View>
            : null
    )
}

const styles = StyleSheet.create({

    indicator_title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '400',
        marginTop: 20,
        marginBottom: 10,
    },

    indicator_time: {
        fontSize: 60,
        fontWeight: '800',
        textAlign: 'center',
    },

    indicator_inner: {
        width: 214,
        position: 'absolute',
        bottom: '-5%',
        left: Dimensions.get('window').width > 500 ? wp('30%') : wp('25%'),
    },

    indicator_percents: {
        fontSize: 15,
        paddingBottom: 10,
    },

    indicator_parent: {
        position: 'relative',
    },

    indicator_backlayer: {
        position: 'absolute',
        top: 0,

        width: '100%',
        height: 7,

        backgroundColor: '#2E4C68',
        borderRadius: 7,


    },

    indicator_frontlayer: {
        position: 'absolute',
        top: 0,
        left: 0,

        height: 7,

        backgroundColor: '#D9E9F3',
        borderRadius: 17,
    }

})

export default Indicator