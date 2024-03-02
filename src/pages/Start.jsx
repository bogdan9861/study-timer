import { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { addSchedules, addNowIndex, addFormatedTime } from '../slices/MainSlice'
import { addScheduleListItem, changeLoading, removeSchedule, setEditedId } from '../slices/StartSlice'

import { getData, getAllDataKeys, deleteData } from '../utils/AsyncData'

import Footer from '../components/Footer'
import Head from '../components/Head'

import Settings from '../components/Settings'
import bin from '../assets/bin.png'
import arrow from '../assets/arrow.png'
import edit from '../assets/edit.png'


const Start = ({ navigation }) => {

    const { ScheduleController, loading } = useSelector(state => state.start);

    const dispatch = useDispatch();

    const Redirect = (path) => {
        navigation.navigate(path, { name: path })
    }

    const deleteAllData = () => {
        getAllDataKeys()
            .then((res) => removeAllKeys(res))
            .catch(e => console.log(e))

        const removeAllKeys = (res) => {
            res.forEach(key => {
                deleteData(key)
            })
        }
    }

    const deleteScheduleFromList = (i) => {
        deleteData(`${ScheduleController[i].id}`)
        dispatch(removeSchedule(i));
    }

    useEffect(() => {
        dispatch(changeLoading(true));

        getAllDataKeys()
            .then((res) => getDataByKeys(res))
            .then(() => dispatch(changeLoading(false)))
            .catch(e => console.log(e))

        function getDataByKeys(keys) {
            keys.forEach((key, i) => {
                getData(key).then((res) => {
                    dispatch(addScheduleListItem(JSON.parse(res)))
                })
            })
        }

    }, [])

    const redirectWithChedule = (index) => {
        let scheduleArr = [];

        if (!loading) {
            for (let i in Object.keys(ScheduleController[index].schedules)) {
                scheduleArr.push(ScheduleController[index].schedules[i])
            }
        }

        dispatch(addNowIndex(0))
        dispatch(addFormatedTime(''))
        dispatch(addSchedules(scheduleArr))
        Redirect('Main');
    }

    const redirectToEdit = (i) => {
        dispatch(setEditedId(i));

        Redirect('CreateSchedule');
    }

    const onCreateSchedule = () => {
        Redirect('CreateSchedule');

        dispatch(setEditedId(null));
    }



    return (
        <View style={styles.start}>
            <Settings />
            <Head />
            <Text style={styles.start_title}>
                {
                    ScheduleController.length > 0
                        ? 'Список расписаний'
                        : 'Добавьте расписание'
                }
            </Text>
            <ScrollView style={styles.list}>
                {
                    loading && ScheduleController.length > 0 ? <ActivityIndicator /> :
                        ScheduleController.map((el, i) => {
                            return (
                                <View style={styles.list_item} key={i}>

                                    <Text style={styles.item_name}>{i + 1}. {el.name.length > 17 ? `${el.name.slice(0, 17)}...` : el.name}</Text>

                                    <View style={styles.item_inner}>
                                        <Pressable style={[styles.item_btn, styles.delete]} onPress={() => deleteScheduleFromList(i)}>
                                            <Image source={bin} />
                                        </Pressable>

                                        <Pressable style={[styles.item_btn, styles.edit]} onPress={() => redirectToEdit(i)}>
                                            <Image source={edit} />
                                        </Pressable>

                                        <Pressable style={[styles.item_btn, styles.next]} onPress={() => redirectWithChedule(i)}>
                                            <Image source={arrow} />
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        })
                }
            </ScrollView>
            <Pressable
                style={styles.add}
                onPress={() => onCreateSchedule()}
            >
                <Text>Добавить</Text>
            </Pressable>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({

    start_title: {
        fontSize: wp('9%'),
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 35,
    },

    list: {
        marginTop: hp('10%'),
        marginBottom: hp('5%'),
        marginLeft: 'auto',
        marginRight: 'auto',

        paddingLeft: 15,
        paddingRight: 15,

        width: wp('98%'),
        height: hp('35%'),
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
        width: 250
    },

    delete: {
        backgroundColor: '#E38663',
    },

    next: {
        backgroundColor: '#F5D99A',
    },

    edit: {
        backgroundColor: '#91C300'
    },

    item_btn: {
        width: 35,
        height: 35,

        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',

        marginHorizontal: wp('1%')
    },

    add: {
        backgroundColor: '#F5D99A',
        width: 150,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
});


export default Start