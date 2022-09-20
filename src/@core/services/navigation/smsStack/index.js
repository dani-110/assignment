import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Verification, NewPass, Conversation, Chat } from '../../../../screens';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Icons } from '../../../../assets/assetsPath';
import { infoValue } from '../../store';
import { useDispatch, useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();

export const SmsStack = (props) => {
    const infoSelector = useSelector((state) => {
        return state.infoReducer.isInfo
    })

    const dispatch = useDispatch()
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.headerBase,
                },
                headerShown: true,
                headerTitleAlign: 'center',
                animation: 'slide_from_right',
                headerBackTitleVisible: false,
            }}
            initialRouteName="Conversation">
            <Stack.Screen name={'Conversation'} component={Conversation} options={{
                title: 'Messages',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{ flexDirection: "row", alignItems: 'center' }}
                    >
                        <Icon name='arrow-back-ios' size={20} color={'#000'} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Chat', { new: true })}
                    >
                        <Icons.Plus width={20} height={20} fill={Colors.purple} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="Chat" component={Chat} options={({ navigation, route }) => ({
                title: 'Name',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ flexDirection: "row", alignItems: 'center' }}
                    >
                        <Icon
                            name={'arrow-back-ios'}
                            size={25}
                            color={'#000'}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => dispatch(infoValue(infoSelector ? false : true))}
                        style={{ flexDirection: "row", alignItems: 'center' }}
                    >
                        <Icons.Info width={20} height={20} fill={"#000"} />

                    </TouchableOpacity>
                )
            })} />
        </Stack.Navigator>
    )
}