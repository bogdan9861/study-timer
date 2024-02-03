import { Text } from "react-native";

const Alert = (condition, message) => {
    if (condition) {
        alert(String(message));
    } 
}

export default Alert