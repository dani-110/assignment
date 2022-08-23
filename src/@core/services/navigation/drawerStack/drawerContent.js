//import liraries
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { DrawerItem, DrawerContentScrollView, DrawerContent } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../../constants/colors';
import { styles } from './drawer.styles';
import LinearGradient from 'react-native-linear-gradient';
import { DrawerHeader } from './drawerHeader';
import { Constent } from '../../../../constants/AppStyles';
import { CommonActions } from "@react-navigation/native";

// create a component
export const DrawerView = (props) => {

    const {
        navigation
    } = props
    const gotoLogin = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "AuthStack" }],
            })
        );
    }
    return (
        <View style={styles.contentMain}>

            <DrawerContentScrollView scrollEnabled={false} {...props}>
                <DrawerHeader />

                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='dashboard'
                            color={Colors.headerColor}
                            size={30}
                        />
                    )}
                    label='Dashboard'
                    labelStyle={styles.label}
                    onPress={() => { navigation.navigate('DashboardStack') }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='settings'
                            color={Colors.headerColor}
                            size={30}
                        />
                    )}
                    label='Settings'
                    labelStyle={styles.label}
                    onPress={() => { navigation.navigate('Settings') }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='person'
                            color={Colors.headerColor}
                            size={30}
                        />
                    )}
                    label='Users'
                    labelStyle={styles.label}
                    onPress={() => { navigation.navigate('UserManagement') }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='shopping-cart'
                            color={Colors.headerColor}
                            size={30}
                        />
                    )}
                    label='Subscription'
                    labelStyle={styles.label}
                    onPress={() => { navigation.navigate('Subscription') }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='logout'
                            color={Colors.headerColor}
                            size={30}
                        />
                    )}
                    label='Logout'
                    labelStyle={styles.label}
                    onPress={gotoLogin}
                />

            </DrawerContentScrollView>
            <View style={styles.bottomView}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={Colors.dashGrd}
                    style={{ flex: 1, ...Constent.insideCenter }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name='store'
                            color={Colors.headerColor}
                            size={50}
                        />
                        <Text style={styles.companyName}>Company Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Text style={styles.privacy}>Privacy Policy</Text>
                        <Text style={styles.privacy}>Terms of Use</Text>
                    </View>
                </LinearGradient>
            </View >
        </View >
    );
};
