import React, { useEffect, useState } from 'react';
import { TwilioConfigNumStory } from './twilioConfigNumStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";


export const TwilioConfigNum = (props) => {
    const {
        navigation
    } = props
    const [ssid, setSsid] = useState("");
    const [authToken, setAuthToken] = useState("");
    const gotoDashboard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "DashboardStack" }],
            })
        );
    }
    return (
        <TwilioConfigNumStory
            ssid={ssid}
            setSsid={(e) => setSsid(e)}
            authToken={authToken}
            setAuthToken={(e) => setAuthToken(e)}
            gotoDashboard={gotoDashboard}
        />
    )
}