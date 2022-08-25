import React, { useEffect, useState } from 'react';
import { LoginStory } from './loginStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";
import axios from '../../@core/services/utilsfunctions'
import _ from "lodash";
import Util from '../../util';
import { tokenValue, UserValue } from '../../@core/services/store';


export const Login = (props) => {
    const {
        navigation
    } = props

    const [email, setEmail] = useState("daniyalhussain995@gmail.com");
    const [password, setPassword] = useState("123456789a");
    const [isSelected, setIsSelected] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.tokenReducer
    })

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    useEffect(() => {
        getAuth()
    }, [])

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
            console.log(selector.token)
            const params = {
                "email": email,
                "password": password,
            }
            try {
                await axios._postApi('/Verifypassword', params, selector.token).then(res => {
                    console.log(res, 'response of resgister')
                    if (res.status == 200) {
                        dispatch(UserValue({
                            user: res.data,
                            isLogin: true
                        }))
                        gotoDashboard()
                    } else {
                        Util.topAlertError(res.data['error'])
                    }
                })
            }
            catch (e) {
                console.log(e)
            }
        }
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
        />
    )

}