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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class Routes extends Component {
    render() {
        return (
            <NavigationContainer>
                {/* <Tab.Navigator>
                    <Tab.Screen name={'Movies'} component={Movies} options={{ headerShown: false }} />
                    <Tab.Screen name={'Favorite'} component={Favorite} options={{ headerShown: false }} />
                </Tab.Navigator> */}
                <Stack.Navigator initialRouteName={'AuthStack'} screenOptions={{
                    // drawerStyle: { width: '80%' }
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
}