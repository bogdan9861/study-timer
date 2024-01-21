import Head from "../components/Head";
import Clock from "../components/Clock";
import Schedules from "../components/Schedules";
import Indicator from "../components/Indicator";

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
            {
                !ended ?
                    <Image style={styles.footer} source={footer}></Image>
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        top: '165%',
        width: '100%'
    }
})


export default Main