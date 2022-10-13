import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../Screens/PreloadScreen/Preload';
import Login from '../Screens/LoginScreen/Login';
import CardInformation from '../Screens/CardInformationScreen/CardInformation';
import Setting from '../Screens/SettingScreen/Settings';
import Home from '../Screens/HomeScreen/Home';


const Stack = createStackNavigator();


export default () => (
    <Stack.Navigator
        initialRouteName='Preload'
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen name='Preload' component={Preload} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='CardInformation' component={CardInformation} />
        <Stack.Screen name='Settings' component={Setting} />
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
);