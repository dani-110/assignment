import React, { useEffect, useState,useContext } from 'react';
import { LoginStory } from './loginStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";
import axios from '../../@core/services/utilsfunctions'
import _ from "lodash";
import Util from '../../util';
import { tokenValue, UserValue } from '../../@core/services/store';

import jwt_decode from "jwt-decode";
import {AuthContext} from '../../context/authContext';

import { NotificationBarContext } from '../../context/notificationBar';

export const Login = (props) => {
    const {
        navigation
    } = props

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("daniyalhussain995@gmail.com");
    // const [password, setPassword] = useState("123456789a");
    const [isSelected, setIsSelected] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);


  const {isLoading, login} = useContext(AuthContext);

  const { showBar} = useContext(NotificationBarContext);

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

    const loginx = async () => {
        gotoDashboard()
        // if (validateForm()) {
        //     const params = {
        //         "email": email,
        //         "password": password,
        //     }
        //     try {
        //         login(params).then((res)=>{
        //             if(res.status==405){
        //                 showBar(res.data.error,'error')
        //             }
        //             if(res.status==200){
        //                 if(res.data.hasOwnProperty('error'))
        //                 showBar(res.data.error,'error')
        //             }
        //         })
        //     }
        //     catch (e) {
        //         console.log(e)
        //     }
        // }
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
            login={loginx}
        />
    )

}