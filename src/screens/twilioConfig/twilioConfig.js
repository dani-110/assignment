import React, { useContext, useState } from 'react';
import { TwilioConfigStory } from './twilioConfigStory';
import axios from '../../@core/services/utilsfunctions'
import {AuthContext} from '../../context/authContext';


export const TwilioConfig = (props) => {
    const {userInfo} = useContext(AuthContext);
    const {
        navigation
    } = props
    const [ssid, setSsid] = useState("");
    const [authToken, setAuthToken] = useState('');

    useState(() => {
    }, [])

    const updateSSid = async () => {
        // const params ={
        //     ssid:ssid,
        //     authkey:authToken,
        //     email:userInfo.clientid
        // }
        // try {
        //     await axios._postApi('/updatessid', params,userInfo.token).then(res => {
        //         console.log(res, 'updatessid')
        //         if (res.status = 200) {
        //             console.log(res.data.numbers.numbers)
                    navigation.navigate('TwilioConfigNum')
                    // navigation.navigate('TwilioConfigNum',res.data.numbers.numbers)
        //         }
        //     })
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }

    return (
        <TwilioConfigStory
            ssid={ssid}
            setSsid={(e) => setSsid(e)}
            authToken={authToken}
            setAuthToken={(e) => setAuthToken(e)}
            updateSSid={updateSSid}
        />
    )
}
