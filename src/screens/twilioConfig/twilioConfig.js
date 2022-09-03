import React, { useEffect, useState } from 'react';
import { TwilioConfigStory } from './twilioConfigStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'



export const TwilioConfig = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route


    const [ssid, setSsid] = useState("");
    const [authToken, setAuthToken] = useState('');
    const selector = useSelector((state) => {
        return state.tokenReducer.token
    })
    useState(() => {
        console.log(params.email, selector)
    }, [])

    const gotoTwilioConfigNum = (data, number) => {
        navigation.navigate('TwilioConfigNum', { data: data, number: number })
    }

    const setTwilioConfig = async () => {
        console.log('dsadsa')
        const param = {
            "email": params.email,
            "ssid": ssid,
            "authkey": authToken
        }
        try {
            await axios._postApi('/updatessid', param, selector).then(res => {
                console.log(res.data.numbers, 'updatessid')
                if (res.status = 200) {
                    gotoTwilioConfigNum(param, res.data.numbers.numbers)
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <TwilioConfigStory
            ssid={ssid}
            setSsid={(e) => setSsid(e)}
            authToken={authToken}
            setAuthToken={(e) => setAuthToken(e)}
            gotoTwilioConfigNum={gotoTwilioConfigNum}
            setTwilioConfig={setTwilioConfig}
        />
    )
}