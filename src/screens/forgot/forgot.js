import React, { useEffect, useState } from 'react';
import { ForgotStory } from './forgotStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'
import _ from "lodash";
import Util from '../../util';

export const Forgot = (props) => {
    const {
        navigation
    } = props

    const [email, setEmail] = useState("");

    const gotoVerification = () => {
        navigation.navigate('Verification', { name: 'forgot', email: email })
    }

    const selector = useSelector((state) => {
        return state.tokenReducer
    })

    const validateForm = () => {
        if (_.isEmpty(email)) {
            Util.topAlertError("Email is empty")
            return false
        } else if (!Util.isEmailValid(email)) {
            Util.topAlertError("Email is not in correct format")
            return false
        }
        return true
    }

    const forgot = async () => {
        if (validateForm()) {
            const params = {
                "email": email
            }
            try {
                await axios._postApi('/resetcode', params, selector.token).then(res => {
                    console.log(res.data, 'response of resgister')
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
        <ForgotStory
            email={email}
            getEmail={(e) => { setEmail(e) }}
            gotoVerification={gotoVerification}
            forgot={forgot}
        />
    )
}