import { Image, StyleSheet, View } from "react-native";

import Head from "../components/Head";
import Clock from "../components/Clock";
import Indicator from "../components/Indicator";
import Schedules from "../components/Schedules";
import Footer from "../components/Footer";



const Main = ({ navigation }) => {

    return (
        <View style={styles.main}>
            <Head />
            <Clock />
            <Indicator />
            <Schedules navigation={navigation} />
            <Footer />

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