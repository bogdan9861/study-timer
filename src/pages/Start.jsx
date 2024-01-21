import { View, Text, Pressable, StyleSheet, Image } from "react-native"

import Head from "../components/Head"
import footer from "../assets/footer.png"

import { addDefaultSchedules } from "../slices/MainSlice"
import { useDispatch } from "react-redux"

const Start = ({ navigation }) => {

    const dispatch = useDispatch();

    const onRedirect = (path) => {
        navigation.navigate(path, { name: path })
        if (path == 'Main') dispatch(addDefaultSchedules());
    }

    return (
        <View style={styles.start}>
            <Head />
            <View style={styles.start_title_wrapper}>
                <Text style={styles.start_title}>Воспользоваться расписанием для студентов?</Text>
                <View style={styles.start_btns_wrapper}>
                    <Pressable style={styles.start_btn}>
                        <Text style={styles.start_btn_text} onPress={() => onRedirect('Main')}>Да</Text>
                    </Pressable>

                    <Pressable style={styles.start_btn} onPress={() => onRedirect('CreateSchedule')}>
                        <Text style={styles.start_btn_text}>нет</Text>
                    </Pressable>
                </View>
            </View>
            <Image style={styles.footer} source={footer} />
        </View>
    )
}

const styles = StyleSheet.create({

    start: {
        position: 'relative'
    },

    start_title_wrapper: {
        alignItems: 'center',
        marginTop: 150,
    },

    start_title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
        marginTop: 20,
        maxWidth: 300,
    },

    start_btns_wrapper: {
        flexDirection: 'row',
    },

    start_btns_wrapper: {
        flexDirection: 'row',
        marginTop: 50,
        columnGap: 10,
    },

    start_btn: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#E38663',

        justifyContent: 'center'
    },

    start_btn_text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },

    footer: {
        position: 'absolute',
        top: '140%',
        width: '100%',
    },
});


export default Start