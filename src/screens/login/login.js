import React, { useEffect, useState } from 'react';
import { LoginStory } from './loginStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";
import axios from '../../@core/services/utilsfunctions'
import _ from "lodash";
import Util from '../../util';
import { contactValue, tokenValue, UserValue } from '../../@core/services/store';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';

import jwt_decode from "jwt-decode";


export const Login = (props) => {
    const {
        navigation
    } = props

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [email, setEmail] = useState("daniyalhussain995@gmail.com");
    const [password, setPassword] = useState("123456789a");
    const [isSelected, setIsSelected] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);


    useEffect(() => {
        getContacts()
    }, [])

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.tokenReducer
    })

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };


    const gotoSignUp = () => {
        navigation.navigate('SignUp')
    }
    const gotoForgot = () => {
        navigation.navigate('ForgotStack')
    }
    const gotoDashboard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "DashboardStack" }],
            })
        );
    }

    const validateForm = () => {
        if (_.isEmpty(email)) {
            Util.topAlertError("Email is empty")
            return false
        } else if (!Util.isEmailValid(email)) {
            Util.topAlertError("Email is not in correct format")
            return false
        } else if (_.isEmpty(password)) {
            Util.topAlertError("Password is empty")
            return false
        }
        return true
    }

    const getAuth = async () => {
        const params = {
            'email': 'test@testing.com',
            "password": "password@testing.com"
        }
        try {
            await axios._postApi('/auth', params).then(res => {
                console.log(res, 'sdsa')
                if (res.status == 200) {
                    dispatch(tokenValue(res.data.token))
                }
            })

        }
        catch (e) {
            console.log(e)
        }

    }

    const login = async () => {
        if (validateForm()) {
            const params = {
                "email": email,
                "password": password,
            }
            try {
                // await axios._postApi('/login', params).then(res => {
                //     console.log(res)
                //     if (res.status == 200) {
                //         dispatch(UserValue({
                //             user: res.data,
                //             isLogin: true
                //         }))
                //         dispatch(tokenValue(res.data.token))
                gotoDashboard()
                //     } else {
                //         Util.topAlertError(res.data.error)
                //     }
                // })
            }
            catch (e) {
                console.log(e.response)
            }
        }
    }

    const getContacts = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        ).then(() => Contacts.getAll().then(contacts => {
            console.log(contacts, 'contacts')

            let arr = [];
            contacts.map((e, i) => {
                arr.push({
                    value: e?.givenName + " " + e?.familyName,
                    key: i,
                    number: e?.phoneNumbers[0]?.number,
                    e: e
                })
            })
            dispatch(contactValue(arr.concat()))
        }))
    }
    return (
        <LoginStory
            email={email}
            getEmail={(e) => { setEmail(e) }}
            password={password}
            getPassword={(e) => setPassword(e)}
            secureTextEntry={secureTextEntry}
            toggleSecureEntry={toggleSecureEntry}
            isSelected={isSelected}
            getSelected={(e) => setIsSelected(e)}
            gotoSignUp={gotoSignUp}
            gotoForgot={gotoForgot}
            login={login}
            gotoDashboard={gotoDashboard}
        />
    )

}