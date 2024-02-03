import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";

import replace from "../utils/replace";

const Indicator = () => {

    const { nowIndex, schedules, ended } = useSelector(state => state.main);
    const { hourses, minutes } = useSelector(state => state.clock);

    const [startHourse, setStartHourse] = useState(0);
    const [startMinutes, setStartMinutes] = useState(0);

    const [endHourse, setEndHourse] = useState(0);
    const [endMinutes, setEndMinutes] = useState(0);

    const [remaining, setRemaining] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        setEndHourse(Number(schedules[nowIndex][1][0] + schedules[nowIndex][1][1]))
        setEndMinutes(Number(schedules[nowIndex][1][3] + schedules[nowIndex][1][4]))

        setStartHourse(Number(schedules[nowIndex][0][0] + schedules[nowIndex][0][1]))
        setStartMinutes(Number(schedules[nowIndex][0][3] + schedules[nowIndex][0][4]))
    }, [nowIndex, hourses, minutes, schedules])

    const convertHourses = (num) => {
        return num * 60;
    }

    useEffect(() => {
        setRemaining(Number((convertHourses(endHourse) + endMinutes) - (convertHourses(Number(hourses)) + Number(minutes))));

        setDuration((convertHourses(endHourse) + endMinutes) - (convertHourses(startHourse) + startMinutes));
    }, [endHourse, endMinutes, hourses, minutes, schedules])

    return (
        !ended ?
            <View style={styles.indicator}>
                <Text style={styles.indicator_title}>До конца:</Text>
                <Text style={styles.indicator_time}>{Math.trunc(remaining / 60)}ч {remaining % 60}м</Text>
                <View style={styles.indicator_inner}>
                    <Text style={styles.indicator_percents}>{Math.floor(remaining / duration * 100)}%</Text>
                    <View style={styles.indicator_parent}>
                        <View style={styles.indicator_backlayer}></View>
                        <View
                            style={[
                                styles.indicator_frontlayer,
                                { width: duration != 0 ? Math.floor(remaining / duration * 100) + '%' : 0 }
                            ]}
                        />
                    </View>
                </View>
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
        marginBottom: 35,
    },

    indicator_inner: {
        width: 214,
        position: 'absolute',
        bottom: '-5%',
        left: '25%',
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