import React, { useEffect, useState } from 'react';
import { TwilioConfigStory } from './twilioConfigStory';
import { useDispatch, useSelector } from 'react-redux'



export const TwilioConfig = (props) => {
    const {
        navigation
    } = props
    const [ssid, setSsid] = useState("");
    const [authToken, setAuthToken] = useState();

    useState(() => {
    }, [])

    const gotoTwilioConfigNum = () => {
        navigation.navigate('TwilioConfigNum')
    }
    return (
        <TwilioConfigStory
            ssid={ssid}
            setSsid={(e) => setSsid(e)}
            authToken={authToken}
            setAuthToken={(e) => setAuthToken(e)}
            gotoTwilioConfigNum={gotoTwilioConfigNum}
        />
    )
}