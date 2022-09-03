import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Dashboard, Packages, Settings, UserManagement } from '../../../../screens';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerView } from './drawerContent';
import { Colors } from '../../../../constants/colors';
import { Icons } from '../../../../assets/assetsPath';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
                drawerIcon: () => (
                    <Icons.Setting width={20} height={20} fill={"#000"} />
                ),
            }}
            drawerContent={props => <DrawerView {...props} />}
            initialRouteName="Dashboard">
            <Drawer.Screen name="DashboardStack" component={Dashboard} options={{
                title: 'Dashboard',
                headerTitleAlign: 'center',
                drawerIcon: () => (
                    <Icons.Setting width={20} height={20} fill={"#000"} />
                ),

            }} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="UserManagement" component={UserManagement} />
            <Drawer.Screen name="Subscription" component={Packages} />
        </Drawer.Navigator>
    )
}