import React, { useEffect, useState } from 'react';
import { ConnectWithStory } from './connectWithStory';
import { useDispatch, useSelector } from 'react-redux'


export const ConnectWith = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route

    console.log(params)

    const gotoConnectBusiness = () => {
        navigation.navigate('ConnectBusiness')
    }

    const gotoTwilio = () => {
        navigation.navigate('TwilioConfig', { email: params.email })
    }

    return (
        <ConnectWithStory
            gotoTwilio={gotoTwilio}
            gotoConnectBusiness={gotoConnectBusiness}
        />
    )
}