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

        // const client = require('twilio')('AC7b134be132ea0f852f7bfcec8dd7e752', 'd1ddf3393daf9527764ddb6400b2f604', {
        //     lazyLoading: true
        // })
        // console.log(client)

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