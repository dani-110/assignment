import React, { useEffect, useState } from 'react';
import { PackagesStory } from './packagesStory';
import { useDispatch, useSelector } from 'react-redux'


export const Packages = (props) => {
    const {
        navigation
    } = props

    const gotoConnectBusiness = () => {
        navigation.navigate('ConnectBusiness')
    }
    return (
        <PackagesStory
            gotoConnectBusiness={gotoConnectBusiness}
        />
    )
}