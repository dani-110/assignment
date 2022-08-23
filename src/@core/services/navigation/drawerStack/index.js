import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Dashboard, Packages, Settings, UserManagement } from '../../../../screens';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerView } from './drawerContent';
import { Colors } from '../../../../constants/colors';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const DrawerStack = (props) => {
    useEffect(() => {
    }, [])
    return (
        // <Stack.Navigator initialRouteName="Dashboard">
        //     <Stack.Screen name="Dashboard" component={Dashboard} />
        // </Stack.Navigator>
        <Drawer.Navigator
            screenOptions={{
                // drawerStyle: { width: '80%' }
                headerStyle: {
                    backgroundColor: Colors.headerBase,
                }
            }}
            drawerContent={props => <DrawerView {...props} />}
            initialRouteName="Dashboard">
            <Drawer.Screen name="DashboardStack" component={Dashboard} options={{
                title: 'Dashboard',
                headerTitleAlign: 'center'
            }} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="UserManagement" component={UserManagement} />
            <Drawer.Screen name="Subscription" component={Packages} />
        </Drawer.Navigator>
    )
}