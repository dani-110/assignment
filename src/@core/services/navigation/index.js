import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ForgotStack } from './forgotStack';
import { AuthStack } from './authStack';
import { CallLogs, Conversation, Dialer } from '../../../screens';
import { Colors } from '../../../constants/colors';
import { SmsStack } from './smsStack';
import { DrawerStack } from './drawerStack'
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
    const selector = useSelector((state) => {
        return state.UserReducer
    })
    console.log(selector)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={selector.isLogin ? 'DashboardStack' : 'AuthStack'} screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.headerBase,
                },
                headerShown: false,
                animation: 'slide_from_right',
                headerBackTitleVisible: false,
            }}>
                <Stack.Screen name={'AuthStack'} component={AuthStack} options={{ headerShown: false }} />
                <Stack.Screen name={'ForgotStack'} component={ForgotStack} options={{ headerShown: false }} />
                <Stack.Screen name={'DashboardStack'} component={DrawerStack} options={{ headerShown: false }} />
                <Stack.Screen name={'CallLogs'} component={CallLogs} options={{
                    title: 'Calling History',
                    headerShown: true,
                    headerTitleAlign: 'center'
                }} />
                <Stack.Screen name={'Conversation'} component={SmsStack} />
                <Stack.Screen name={'Dialer'} component={Dialer} options={{
                    headerShown: true,
                    headerTitleAlign: 'center'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}