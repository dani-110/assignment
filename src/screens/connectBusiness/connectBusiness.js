import React, { useEffect, useState } from 'react';
import { ConnectBusinessStory } from './connectBusinessStory';
import { useDispatch, useSelector } from 'react-redux'


export const ConnectBusiness = (props) => {
    const {
        navigation
    } = props
    const [accountID, setAccountID] = useState("");

    const gotoTwilioConfigNum = () => {
        navigation.navigate('TwilioConfigNum')
    }
    const gotoVerification = () => {
        navigation.push('Verification', { name: 'connect' })
    }
    return (
        <ConnectBusinessStory
            accountID={accountID}
            setAccountID={(e) => setAccountID(e)}
            gotoVerification={gotoVerification}
        />
    )
}