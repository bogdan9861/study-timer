import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Dimensions,
} from "react-native"
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveData, deleteData } from '../utils/AsyncData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import replace from '../utils/replace'
import Alert from "../utils/Alert";

import Head from '../components/Head'
import bin from '../assets/bin.png';

import { addScheduleListItem, removeSchedule } from "../slices/StartSlice";
import Footer from "../components/Footer";

const CreateSchedule = ({ navigation }) => {

    const scheduleController = useSelector(state => state.start.ScheduleController);
    const { edited } = useSelector(state => state.edit);

    const [scheduleName, setScheduleName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeArr, setTimeArr] = useState(['', '']);
    const [localSchedules, setLocalSchedules] = useState([])

    const [isDisabled, setDisabled] = useState(true);

    const StartInput = useRef(null);
    const EndInput = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (edited != null) {
            setScheduleName(scheduleController[edited].name);

            let ArrForEdit = [];

            for (i in Object.keys(scheduleController[edited].schedules)) {
                ArrForEdit.push(scheduleController[edited].schedules[i]);
            }

            setLocalSchedules(ArrForEdit);
        }
    }, [edited])


    useEffect(() => {
        setDisabled(localSchedules.length == 0);
    }, [timeArr, localSchedules])

    const onSetTime = useEffect(() => {
        setTimeArr([startTime, endTime]);

        setDots(startTime, setStartTime);
        setDots(endTime, setEndTime);

    }, [startTime, endTime])

    const setDots = (str, setStr) => {

        if (str.length == 4 && str[str.indexOf(':', 0)] != ':') {
            setStr(str[0] + str[1] + ':' + str[2] + str[3])
        }
    }

    const addNewTimeInterval = () => {

        let startNumber = Number(replace(startTime)),
            endNumber = Number(replace(endTime));

        let isNotEmpty = scheduleName !== '' && timeArr[0] !== '' && timeArr[1] !== '',
            isValid = startNumber <= 2359 && endNumber <= 2359 && startTime.length == 5 && endTime.length == 5,
            notLess = startNumber < endNumber;

        Alert(!isNotEmpty, 'Заполните каждое поле');
        Alert(!isValid, 'Вы ввели не корректные данные');
        Alert(!notLess, 'Время начала больше или равно времени конца');

        function setTime() {
            if (!isNotEmpty || !isValid || !notLess) return;

            setLocalSchedules([...localSchedules, timeArr]);
            setStartTime('');
            setEndTime('');
        }

        setTime()
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

    const onNavigate = () => {

        let id = scheduleController.length;
        let name = scheduleName;
        let newScheduleInfo = { name, schedules: localSchedules, id };
        let covertedSchedule = {};

        localSchedules.forEach((el, i) => {
            covertedSchedule[i] = el;
        })


        if (edited == null) {
            let newConvertedScheduleInfo = { id, name, schedules: covertedSchedule }

            saveData(`${id}`, JSON.stringify(newConvertedScheduleInfo));
            dispatch(addScheduleListItem(newScheduleInfo));
        } else {
            let editedScheduleInfo = { id: edited, name, schedules: covertedSchedule }

            deleteData(`${edited}`)
            dispatch(removeSchedule(edited))

            dispatch(addScheduleListItem(editedScheduleInfo));
            saveData(`${edited}`, JSON.stringify(editedScheduleInfo))
        }

        navigation.navigate('Start', { name: 'Start' })
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
                        style={[styles.input, styles.input_name]}
                        placeholder="введите название"
                        placeholderTextColor="#fff"
                        value={scheduleName}
                        onChangeText={setScheduleName}
                    />
                    <Pressable style={styles.input_btn} onPress={() => StartInput.current.focus()}>
                        <Text style={styles.input_btn_text}>+</Text>
                    </Pressable>
                </View>
                <View style={styles.form_inner}>
                    <View style={styles.input_wrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="начало"
                            placeholderTextColor="#fff"
                            maxLength={5}
                            keyboardType="number-pad"
                            value={timeArr[0]}
                            onChangeText={setStartTime}
                            ref={StartInput}
                        />
                        <Pressable
                            style={styles.input_btn}
                            onPress={() => EndInput.current.focus()}
                        >
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
                            ref={EndInput}
                        />
                        <Pressable style={styles.input_btn} onPress={() => addNewTimeInterval()}>
                            <Text style={styles.input_btn_text}>+</Text>
                        </Pressable>
                    </View>
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
                    onPress={onNavigate}
                    disabled={isDisabled}
                >
                    <Text style={styles.next_btn_text}>Подтвердить</Text>
                </Pressable>
            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    create: {
        height: hp('100%'),
    },

    create_title_wrapper: {
        alignItems: 'center'
    },

    create_title: {
        fontSize: hp('4%'),
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: hp('4.1%'),

        maxWidth: wp('60%'),
        marginTop: hp('8%'),
        marginBottom: hp('5%'),
    },

    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    form_inner: {
        width: '100%',
        flexDirection: 'row',
        columnGap: 25,
        marginBottom: hp('5%'),
    },

    input_wrapper: {
        position: 'relative',
        marginBottom: 0,
    },

    input_name: {
        width: '100%',
        marginBottom: 15,

    },

    input: {
        width: 130,
        height: 47,

        backgroundColor: '#E38663',
        borderRadius: 26,
        paddingLeft: 9,
        paddingRight: 47,
        paddingVertical: 14,

        color: '#fff',
        fontWeight: '400',
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
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    create_list: {
        height: hp('15%'),
        marginBottom: hp('5%')
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
        fontSize: hp('2.3%')
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

    disabled_style: {
        backgroundColor: '#BEBEBE',
    },

    next_btn_text: {
        textAlign: 'center',
        fontSize: 16,
        fontSize: hp('1.6%')
    },

    header: {
        width: '100%',
        top: 0,
    },

    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: -1,
    }
})

export default CreateSchedule