import React, { useEffect, useState } from 'react';
import { ForgotStory } from './forgotStory';
import { useDispatch, useSelector } from 'react-redux'


export const Forgot = (props) => {
    const {
        navigation
    } = props

    const [email, setEmail] = useState("");

    const gotoVerification = () => {
        navigation.navigate('Verification')
    }

    return (
        <ForgotStory
            email={email}
            getEmail={(e) => { setEmail(e) }}
            gotoVerification={gotoVerification}
        />
    )
}