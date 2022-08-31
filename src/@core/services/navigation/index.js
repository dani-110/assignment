import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ForgotStack } from './forgotStack';
import { AuthStack } from './authStack';
import { CallLogs, ConnectBusiness, ConnectWith, Conversation, Dialer, Verification } from '../../../screens';
import { Colors } from '../../../constants/colors';
import { SmsStack } from './smsStack';
import { DrawerStack } from './drawerStack'
import { Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { filterValue } from '../store';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
    const selector = useSelector((state) => {
        return state.UserReducer
    })
    const filterSelector = useSelector((state) => {
        return state.filterReducer.isFilter
    })

    const dispatch = useDispatch()
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
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => dispatch(filterValue(filterSelector ? false : true))}
                        >
                            <Icon name='filter-list' size={20} />
                        </TouchableOpacity>
                    )
                }} />
                <Stack.Screen name={'Conversation'} component={SmsStack} />
                <Stack.Screen name={'Dialer'} component={Dialer} options={{
                    headerShown: true,
                    headerTitleAlign: 'center'
                }} />

                <Stack.Screen name="ConnectWith" component={ConnectWith} />
                <Stack.Screen name='ConnectBusiness' component={ConnectBusiness} />
                <Stack.Screen name="Verification" component={Verification} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}