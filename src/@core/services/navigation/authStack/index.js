import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConnectBusiness, ConnectWith, Login, SignUp, TwilioConfig, TwilioConfigNum, Verification } from '../../../../screens';


const Stack = createNativeStackNavigator();

export const AuthStack = (props) => {
    useEffect(() => {
    }, [])
    return (
        <Stack.Navigator
            screenOptions={(params) => ({
                headerShown: false,
                animation: 'slide_from_right'
            })}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="TwilioConfig" component={TwilioConfig} />
            <Stack.Screen name="TwilioConfigNum" component={TwilioConfigNum} />
            <Stack.Screen name="ConnectWith" component={ConnectWith} />
            <Stack.Screen name='ConnectBusiness' component={ConnectBusiness} />
        </Stack.Navigator>
    )
}