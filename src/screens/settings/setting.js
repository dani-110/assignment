import React, { useContext, useState } from 'react';
import { SettingsStory } from './settingsStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'

import {AuthContext} from '../../context/authContext';
import { NotificationBarContext } from '../../context/notificationBar';
import AsyncStorage from '@react-native-community/async-storage';

import Util from '../../util';
import _ from "lodash";

export const Settings = (props) => {
    const {
        navigation
    } = props

    const {userInfo,setUserInfo} = useContext(AuthContext);
  const { showBar} = useContext(NotificationBarContext);

    console.log(userInfo,'sadbk')
    const [name, setName] = useState(`${userInfo.data.FirstName} ${userInfo.data.LastName}`);
    const [email, setEmail] = useState(userInfo.data.Email);
    const [company, setCompany] = useState(userInfo.data.Company);
    const [domain, setDomain] = useState(userInfo.data.Website);
    const [ssid, setSsid] = useState(userInfo.data.TwillioSSID);
    const [authToken, setAuthToken] = useState(userInfo.data.TwillioAuthKey);
    const [phone, setPhone] = useState("8877656655");
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [existing, setExisting] = useState("");
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const [secureTextEntry3, setSecureTextEntry3] = useState(true);

    const toggleSecureEntry1 = () => {
        setSecureTextEntry1(!secureTextEntry1);
    };

    const toggleSecureEntry2 = () => {
        setSecureTextEntry2(!secureTextEntry2);
    };
    const toggleSecureEntry3 = () => {
        setSecureTextEntry3(!secureTextEntry3);
    };


    const validateForm = () => {
        let username = name.split(' ')
        if (_.isEmpty(username[0])) {
            showBar("Name is empty",'error')
            return false
        } else if (_.isEmpty(username.slice(1, username.length).join(' '))) {
            showBar("Please provide your full name",'error')
            return false
        } else if (_.isEmpty(email)) {
            showBar("Email is empty",'error')
            return false
        } else if (!Util.isEmailValid(email)) {
            showBar("Email is not in correct format")
            return false
        }
        return true
    }

    const updateProfile = async () => {
        if (validateForm()) {

        let username = name.split(' ')
        const params ={
            "company": company, 
            "email": email,
            "firstname": username[0],
            "lastname": username.slice(1, username.length).join(' '),
            "password": password, 
            "website":domain,
            "twillioSSID":ssid,
            "twillioAuthKey":authToken,
            "twillioPhoneNo":phone
            }
        try {
            await axios._postApi('client/updateprofile', params,userInfo.token).then(res => {
                if (res.status = 200) {
                    let obj = {
                        ...userInfo,
                        data:res.data
                    }
                    setUserInfo(obj);
                    AsyncStorage.setItem('userInfo', JSON.stringify(obj));
                    showBar("Profile Updated!",'success')
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    }

    return (
        <SettingsStory
            name={name}
            getName={(e) => { setName(e) }}
            email={email}
            getEmail={(e) => { setEmail(e) }}
            company={company}
            getCompany={(e) => { setCompany(e) }}
            domain={domain}
            getDomain={(e) => { setDomain(e) }}
            ssid={ssid}
            getSsid={(e) => { setSsid(e) }}
            phone={phone}
            getPhone={(e) => { setPhone(e) }}
            visible={visible}
            setVisible={(e) => setVisible(e)}
            password={password}
            getPassword={(e) => { setPassword(e) }}
            confirmPassword={confirmPassword}
            getConfirmPassword={(e) => { setConfirmPassword(e) }}
            existing={existing}
            getExisting={(e) => setExisting(e)}
            secureTextEntry1={secureTextEntry1}
            toggleSecureEntry1={toggleSecureEntry1}
            secureTextEntry2={secureTextEntry2}
            toggleSecureEntry2={toggleSecureEntry2}
            secureTextEntry3={secureTextEntry3}
            toggleSecureEntry3={toggleSecureEntry3}
            navigation={navigation}
            authToken={authToken}
            getAuthToken={(e) => setAuthToken(e)}
            updateProfile={updateProfile}
        />
    )
}