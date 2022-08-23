import React, { useEffect, useState } from 'react';
import { ConnectWithStory } from './connectWithStory';
import { useDispatch, useSelector } from 'react-redux'


export const ConnectWith = (props) => {
    const {
        navigation
    } = props


    const gotoConnectBusiness = () => {
        navigation.navigate('ConnectBusiness')
    }

    const gotoTwilio = () => {
        navigation.navigate('TwilioConfig')
    }

    return (
        <ConnectWithStory
            gotoTwilio={gotoTwilio}
            gotoConnectBusiness={gotoConnectBusiness}
        />
    )
}