import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Favorite, Movies } from '../../../screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class Routes extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name={'Movies'} component={Movies} options={{ headerShown: false }} />
                    <Tab.Screen name={'Favorite'} component={Favorite} options={{ headerShown: false }} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}