import { Text } from "react-native";

const Alert = (condition, message, func) => {
    if (condition) {
        func()
    } else alert(String(message));
}

export default Alert