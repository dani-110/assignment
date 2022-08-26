import React, { useEffect, useState } from 'react';
import { NewPassStory } from './newPassStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'
import Util from '../../util';
import _ from "lodash";


export const NewPass = (props) => {
    const {
        navigation,
        route
    } = props
    const { params } = route

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const [secureTextEntry3, setSecureTextEntry3] = useState(true);
    const [saveDisable, setSaveDisable] = useState(false);

    const toggleSecureEntry1 = () => {
        setSecureTextEntry1(!secureTextEntry1);
    };

    const toggleSecureEntry2 = () => {
        setSecureTextEntry2(!secureTextEntry2);
    };
    const toggleSecureEntry3 = () => {
        setSecureTextEntry3(!secureTextEntry3);
    };

    const selector = useSelector((state) => {
        return state.tokenReducer
    })

    const validateForm = () => {
        if (_.isEmpty(password)) {
            console.log("sdas")
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
        }
        return true
    }
    const resetPassword = async () => {
        if (validateForm()) {
            const param = {
                "email": params.email,
                "password": password
            }
            try {
                await axios._postApi('/resetpassword', param, selector.token).then(res => {
                    if (res.status == 200) {
                        if (res.data['clientid']) {
                            setSaveDisable(true)
                            Util.topAlertSuccess("Password reset successfull")
                            setTimeout(() => {
                                navigation.navigate('Login')
                            }, 4000)

                        }
                    }
                })
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <NewPassStory
            updatePass={params.updatePass}
            oldPassword={oldPassword}
            getOldPassword={(e) => setOldPassword(e)}
            password={password}
            getPassword={(e) => { setPassword(e) }}
            confirmPassword={confirmPassword}
            getConfirmPassword={(e) => { setConfirmPassword(e) }}
            secureTextEntry1={secureTextEntry1}
            toggleSecureEntry1={toggleSecureEntry1}
            secureTextEntry2={secureTextEntry2}
            toggleSecureEntry2={toggleSecureEntry2}
            secureTextEntry3={secureTextEntry3}
            toggleSecureEntry3={toggleSecureEntry3}
            resetPassword={resetPassword}
            saveDisable={saveDisable}
        />
    )
}