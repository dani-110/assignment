import React, { useEffect, useState, useRef } from 'react';
import { SignUpStory } from './signUpStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'
import _ from "lodash";
import Util from '../../util';
import { tokenValue } from '../../@core/services/store';


export const SignUp = (props) => {
    const {
        navigation
    } = props
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [domain, setDomain] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);


    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.tokenReducer
    })

    const toggleSecureEntry1 = () => {
        setSecureTextEntry1(!secureTextEntry1);
    };
    const toggleSecureEntry2 = () => {
        setSecureTextEntry2(!secureTextEntry2);
    };


    const gotoLogin = () => {
        navigation.navigate('Login')
    }

    const gotoVerification = () => {
        navigation.navigate('Verification', { name: 'signup', email: email })
    }



    const validateForm = () => {
        if (_.isEmpty(firstName)) {
            Util.topAlertError("First Name is empty")
            return false
        } else if (_.isEmpty(lastName)) {
            Util.topAlertError("Last Name is empty")
            return false
        } else if (_.isEmpty(email)) {
            Util.topAlertError("Email is empty")
            return false
        } else if (!Util.isEmailValid(email)) {
            Util.topAlertError("Email is not in correct format")
            return false
        } else if (domain.length > 0 && !Util.isWebSiteValid(domain)) {
            Util.topAlertError("Website is not in correct format")
            return false
        } else if (_.isEmpty(password)) {
            Util.topAlertError("Password is empty")
            return false
        } else if (password.length < 8) {
            Util.topAlertError("Password length must be atleast 8")
            return false
        } else if (!Util.isPasswordValid(password)) {
            Util.topAlertError("Password must contain alteast 1 letter and 1 number")
            return false
        } else if (_.isEmpty(confirmPassword)) {
            Util.topAlertError("Confirm Password is empty")
            return false
        } else if (password !== confirmPassword) {
            Util.topAlertError("Passwords don't match")
            return false
        } else if (!isSelected) {
            Util.topAlertError("Please accept terms and condition")
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
    const signUp = async () => {
        if (validateForm()) {
            const params = {
                "email": email,
                "password": password,
                "firstname": firstName,
                "lastname": lastName,
                "company": company,
                "website": domain
            }
            try {
                await axios._postApi('/signup', params).then(res => {
                    console.log(res, 'response of resgister')
                    if (res.status == 200) {
                        gotoVerification()
                    } else {
                        Util.topAlertError(res.data.error)
                    }
                })
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <SignUpStory
            firstName={firstName}
            getFirstName={(e) => { setFirstName(e) }}
            lastName={lastName}
            getLastName={(e) => { setLastName(e) }}
            email={email}
            getEmail={(e) => { setEmail(e) }}
            company={company}
            getCompany={(e) => { setCompany(e) }}
            domain={domain}
            getDomain={(e) => { setDomain(e) }}
            password={password}
            getPassword={(e) => setPassword(e)}
            confirmPassword={confirmPassword}
            getConfirmPassword={(e) => setConfirmPassword(e)}
            secureTextEntry1={secureTextEntry1}
            toggleSecureEntry1={toggleSecureEntry1}
            secureTextEntry2={secureTextEntry2}
            toggleSecureEntry2={toggleSecureEntry2}
            isSelected={isSelected}
            getSelected={(e) => setIsSelected(e)}
            gotoLogin={gotoLogin}
            gotoVerification={gotoVerification}
            signUp={signUp}
        />
    )

}