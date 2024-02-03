import { useEffect } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Image, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { addSchedules, addNowIndex, addFormatedTime } from '../slices/MainSlice'
import { addNewScheduleList, changeItemId, addScheduleListItem, changeLoading } from "../slices/StartSlice";
import db from '../../firebase'
import { orderBy, query } from "firebase/firestore";

import Head from "../components/Head"
import footer from "../assets/footer.png"
import bin from '../assets/bin.png';
import arrow from '../assets/arrow.png';
import { collection, onSnapshot } from "firebase/firestore";


const Start = ({ navigation }) => {

    const { ScheduleController, loading } = useSelector(state => state.start);

    const dispatch = useDispatch();

    const Redirect = (path) => {
        navigation.navigate(path, { name: path })
    }

    const deleteScheduleFromList = (i) => {
        const filteredArr = ScheduleController.filter(el => {
            if (i == el.id) {
                return false
            }

            return true;
        })

        dispatch(addNewScheduleList(filteredArr));
        dispatch(changeItemId(i))
    }

    useEffect(() => {
        dispatch(changeLoading(true));

        let schedulesInfoList = []

        const scheduleRef = collection(db, 'schedule');
        const q = query(scheduleRef, orderBy('id'))

        onSnapshot(q, (snapshot) => {

            schedulesInfoList = [];

            snapshot.docs.forEach(doc => {
                schedulesInfoList.push(doc.data());
            })

            schedulesInfoList.forEach(el => {
                dispatch(addScheduleListItem(el))
                dispatch(changeLoading(false));
            })
        })
    }, [])
    

    const redirectWithChedule = (index) => {
        let scheduleArr = [];

        if (!loading && index == ScheduleController[index].id) {
            for (let i in Object.keys(ScheduleController[index].schedules)) {
                scheduleArr.push(ScheduleController[index].schedules[i])
            }
        }

        dispatch(addNowIndex(0))
        dispatch(addFormatedTime(""))
        dispatch(addSchedules(scheduleArr));
        Redirect('Main');
    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.start}>
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
                    loading ? <ActivityIndicator /> :
                        ScheduleController.map((el, i) => {
                            return (
                                <View style={styles.list_item} key={i}>
                                    <View style={styles.item_inner}>
                                        <Text style={styles.item_name}>{i + 1}. {el.name}</Text>
                                        <Pressable style={styles.delete} onPress={() => deleteScheduleFromList(i)}>
                                            <Image source={bin} />
                                        </Pressable>
                                    </View>

                                    <Pressable style={styles.next} onPress={() => redirectWithChedule(i)}>
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
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 30,
    },

    footer: {
        position: 'absolute',
        top: '110%',
        width: '100%',
    },
});


export default Start