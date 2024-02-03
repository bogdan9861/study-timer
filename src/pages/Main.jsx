import Head from "../components/Head";
import Clock from "../components/Clock";
import Indicator from "../components/Indicator";
import Schedules from "../components/Schedules";

import footer from '../assets/footer.png'
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";


const Main = () => {
    const { ended } = useSelector(state => state.main)

    return (
        <View style={styles.main}>
            <Head />
            <Clock />
            <Indicator />
            <Schedules />
            <Image style={styles.footer} source={footer}></Image>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: -1
    }
})


export default Main