import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../Components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" />
        <Tab.Screen name="Search" />
        <Tab.Screen name="Appointments" />
        <Tab.Screen name="Favorites" />
        <Tab.Screen name="Profile" />
    </Tab.Navigator>
);