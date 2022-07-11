import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Preload from '../Screens/Preload/Preload';
import Login from '../Screens/Login/Login';
import Home from '../Screens/Home/Home';
import CardInformation from '../Screens/CardInformation/CardInformation';

const Stack = createStackNavigator();


export default () => (
    <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='Preload' component={Preload}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='CardInformation' component={CardInformation}/>
    </Stack.Navigator>
);