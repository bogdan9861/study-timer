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
        top: '160%',
        width: '100%'
    }
})


export default Main