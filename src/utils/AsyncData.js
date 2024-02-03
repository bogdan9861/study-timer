import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data)
    } catch (error) {
        console.log(error);
    }
}

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            return data
        }

    } catch (error) {
        console.log(error);
    }
}

export const getAllDataKeys = async (key) => {
    try {
        const keys = await AsyncStorage.getAllKeys();

        if (keys != null) {
            return keys
        }

    } catch (error) {
        console.log(error);
    }
}

export const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {

    }
}
