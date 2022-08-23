import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Verification, NewPass, Conversation, Chat } from '../../../../screens';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();

export const SmsStack = (props) => {
    useEffect(() => {
    }, [])
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
                        <Icon
                            name={Platform.OS == 'ios' ? 'arrow-back-ios' : 'arrow-back'}
                            size={25}
                            color={Platform.OS == 'ios' ? '#0074cc' : '#000'}
                        />
                        {/* {
                            Platform.OS == 'ios' ?
                                <Text style={{ fontSize: 18, color: '#0074cc' }}>Back</Text> : null
                        } */}

                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Chat', { new: true })}
                    >
                        <Icon
                            name='add'
                            size={25}
                            color={'#0074cc'}
                        />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="Chat" component={Chat} options={{
                title: 'Name',
                headerRight: () => (
                    <TouchableOpacity

                        style={{ flexDirection: "row", alignItems: 'center' }}
                    >
                        <Icon
                            name={'info-outline'}
                            size={25}
                            color={'#000'}
                        />

                    </TouchableOpacity>
                )
            }} />
        </Stack.Navigator>
    )
}