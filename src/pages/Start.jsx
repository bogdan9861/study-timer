import { View, Text, Pressable, ScrollView, StyleSheet, Image } from "react-native"

import Head from "../components/Head"
import footer from "../assets/footer.png"

import { useDispatch, useSelector } from "react-redux";

import bin from '../assets/bin.png';
import arrow from '../assets/arrow.png';
import { useEffect } from "react";

import { addSchedules, addNowIndex, addFormatedTime } from '../slices/MainSlice'
import { addNewScheduleList, changeItemId } from "../slices/StartSlice";

import AsyncStorage from '@react-native-async-storage/async-storage'

const Start = ({ navigation }) => {

    const scheduleController = useSelector(state => state.start.ScheduleController);

    const dispatch = useDispatch();

    const Redirect = (path) => {
        navigation.navigate(path, { name: path })
    }

    const RedirectWithChedule = (i) => {
        if (i == scheduleController[i].id) {
            dispatch(addNowIndex(0))
            dispatch(addFormatedTime(""))
            dispatch(addSchedules(scheduleController[i].schedule))
            Redirect('Main');
        }
    }

    const deleteScheduleFromList = (i) => {
        const filteredArr = scheduleController.filter(el => {
            if (i == el.id) {
                return false
            }

            return true;
        })

        dispatch(changeItemId(i))
        dispatch(addNewScheduleList(filteredArr));
    }

    // const getSchedule = async () => {
    //     try {
    //         const schedule = await AsyncStorage.getItem('schedule');
    //         dispatch(addNewScheduleList(schedule))
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getSchedule();
    // }, [])

    return (
        <View style={styles.start}>
            <Head />
            <Text style={styles.start_title}>
                {
                    scheduleController.length > 0
                        ? 'Список расписаний'
                        : 'Добавьте расписание'
                }
            </Text>
            <ScrollView style={styles.list}>
                {
                    scheduleController.map((el, i) => {
                        return (
                            <View style={styles.list_item} key={i}>
                                <View style={styles.item_inner}>
                                    <Text style={styles.item_name}>1. {el.scheduleName}</Text>
                                    <Pressable style={styles.delete} onPress={() => deleteScheduleFromList(i)}>
                                        <Image source={bin} />
                                    </Pressable>
                                </View>

                                <Pressable style={styles.next} onPress={() => RedirectWithChedule(i)}>
                                    <Image source={arrow} />
                                </Pressable>
                            </View>
                        )
                    })
                }

            </ScrollView>
            <Pressable
                style={styles.add}
                onPress={() => Redirect('CreateSchedule')}
            >
                <Text>Добавить</Text>
            </Pressable>
            <Image style={styles.footer} source={footer} />
        </View>
    )
}

const styles = StyleSheet.create({

    start_title: {
        fontSize: 35,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 35,
    },

    list: {
        marginTop: 84,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 390,
        height: 300,
    },

    list_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingBottom: 10,
        marginBottom: 20,
    },

    item_inner: {
        flexDirection: 'row'
    },

    item_name: {
        fontSize: 20,
        width: 280,
    },

    delete: {
        width: 35,
        height: 35,
        backgroundColor: '#E38663',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
    },

    next: {
        width: 35,
        height: 35,
        backgroundColor: '#F5D99A',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    add: {
        backgroundColor: '#F5D99A',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 30,
    },

    footer: {
        position: 'absolute',
        top: '110%',
        width: '100%',
    },
});


export default Start