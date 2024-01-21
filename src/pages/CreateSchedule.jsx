import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Keyboard,
} from "react-native"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import Head from '../components/Head'
import footer from '../assets/footer.png';
import bin from '../assets/bin.png';

import { addSchedules } from "../slices/MainSlice";

const CreateSchedule = ({ navigation }) => {

    const [localSchedules, setLocalSchedules] = useState([])
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeArr, setTimeArr] = useState(['', '']);

    const [isDisabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setDisabled(localSchedules.length == 0);
    }, [timeArr])

    const onSetTime = useEffect(() => {
        setTimeArr([startTime, endTime]);

        setDots(startTime, setStartTime);
        setDots(endTime, setEndTime);
    }, [startTime, endTime])

    const setDots = (str, setStr) => {
        if (str.length == 2) {
            setStr(str + ":")
        }
    }

    const onNavigate = () => {
        if (!isDisabled) {
            dispatch(addSchedules(localSchedules));
            navigation.navigate('Main', { name: 'Main' })
        }
    }

    const addNewTimeInterval = () => {
        if (timeArr[0] != '' && timeArr[1] != '') {
            setLocalSchedules([...localSchedules, timeArr]);
            setStartTime('');
            setEndTime('');
        }

    }

    const removeTimeInterval = (i) => {
        const filteredArr = localSchedules.filter(el => {
            if (el[0] == localSchedules[i][0] && el[1] == localSchedules[i][1]) {
                return false;
            }

            return true;
        })

        setLocalSchedules(filteredArr);
    }

    return (
        <View style={styles.create}>
            <Head />
            <View style={styles.create_title_wrapper}>
                <Text style={styles.create_title}>
                    Введите
                    расписание
                </Text>
            </View>
            <View style={styles.form}>
                <View style={styles.input_wrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="начало"
                        placeholderTextColor="#fff"
                        maxLength={5}
                        keyboardType="number-pad"
                        value={timeArr[0]}
                        onChangeText={setStartTime}
                    />
                    <Pressable style={styles.input_btn}>
                        <Text style={styles.input_btn_text}>+</Text>
                    </Pressable>
                </View>
                <View style={styles.input_wrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="конец"
                        placeholderTextColor="#fff"
                        keyboardType="number-pad"
                        maxLength={5}
                        value={timeArr[1]}
                        onChangeText={setEndTime}
                    />
                    <Pressable style={styles.input_btn} onPress={() => addNewTimeInterval()}>
                        <Text style={styles.input_btn_text}>+</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.create_list_wrapper}>
                <ScrollView style={styles.create_list}>
                    {
                        localSchedules.map((time, i) => {
                            return (
                                <View style={styles.create_list_item} key={i}>
                                    <Text style={styles.item_text}>{time[0]} - {time[1]}</Text>
                                    <Pressable style={styles.item_delete} onPressIn={() => removeTimeInterval(i)}>
                                        <Image style={styles.item_delete_img} source={bin} />
                                    </Pressable>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <Pressable
                    style={[styles.next_btn, isDisabled ? styles.disabled_style : {}]}
                    onPress={() => onNavigate()}
                    disabled={isDisabled}
                >
                    <Text style={styles.next_btn_text}>Подтвердить</Text>
                </Pressable>
            </View>
            <Image style={styles.footer} source={footer} />
        </View>
    )
}

const styles = StyleSheet.create({
    create: {
        position: 'relative',
        height: '100%',
    },

    create_title_wrapper: {
        alignItems: 'center'
    },

    create_title: {
        fontSize: 40,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 43,

        maxWidth: 250,
        marginTop: 40,
        marginBottom: 50,
    },

    form: {
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 25,
    },

    input_wrapper: {
        position: 'relative',
        marginBottom: 36,
    },

    input: {
        width: 130,

        backgroundColor: '#E38663',
        borderRadius: 26,
        paddingLeft: 9,
        paddingRight: 47,
        paddingVertical: 14,

        color: '#fff',
        fontWeight: '700',
    },

    input_btn: {
        position: 'absolute',
        top: 5,
        right: 5,

        width: 35,
        height: 35,

        backgroundColor: '#fff',
        borderRadius: 26,

        justifyContent: 'center'
    },

    input_btn_text: {
        textAlign: 'center',
    },

    create_list_wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    create_list: {
        height: 150,
        marginBottom: 40,
    },

    create_list_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,

        paddingBottom: 7,
        paddingLeft: 5,
        marginBottom: 18,
    },

    item_text: {
        fontSize: 20,
        fontWeight: '700',
    },

    item_delete: {
        width: 30,
        height: 30,

        backgroundColor: '#E38663',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        marginLeft: 112,
    },

    next_btn: {
        width: 140,
        height: 50,

        backgroundColor: '#F5D99A',
        borderRadius: 11,

        justifyContent: 'center',
    },

    next_btn_text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    },

    header: {
        width: '100%',
        top: 0,
    },

    footer: {
        width: '100%',
        position: 'absolute',
        top: "85%",
    }
})

export default CreateSchedule