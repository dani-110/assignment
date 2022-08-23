import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Forgot, Verification, NewPass } from '../../../../screens';


const Stack = createNativeStackNavigator();

export const ForgotStack = (props) => {
    useEffect(() => {
    }, [])
    return (
        <Stack.Navigator
            screenOptions={(params) => ({
                headerShown: false,
                animation: 'slide_from_right'
            })}
            initialRouteName="Forgot">
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="NewPass" component={NewPass} />
        </Stack.Navigator>
    )
}