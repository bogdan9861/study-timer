import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
});