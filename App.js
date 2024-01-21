import { StyleSheet, Text, View, Image } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer as Container } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/pages/Start';
import CreateSchedule from './src/pages/CreateSchedule';
import Main from './src/pages/Main';

import Store from './src/store';

const Stack = createNativeStackNavigator();


export default function App() {
  return (

    <Provider store={Store}>
      <Container>
        <Stack.Navigator>
          <Stack.Screen
            name='Start'
            component={Start}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='CreateSchedule'
            component={CreateSchedule}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Main'
            component={Main}

            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </Container>
    </Provider>
  )
}


