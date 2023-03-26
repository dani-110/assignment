import React, { useEffect, useState } from 'react';
import { DialerStory } from './dialerStory';
import { useDispatch, useSelector } from 'react-redux'
import { LogBox, YellowBox, NativeModules, NativeAppEventEmitter, Button, View} from 'react-native';
import {check, PERMISSIONS, RESULTS,requestMultiple} from 'react-native-permissions';

export const Dialer = (props) => {
    const {
        navigation
    } = props

    const [number, setNumber] = useState('')
    const [cursor, setCursor] = useState({})
    const [isAnim, setIsAnim] = useState(false)
    const [isDialerOpen, setIsDialerOpen] = useState(true)



    const dialNumber = (text) => {
        setNumber(number + text)
    }
    const backspace = () => {
        // setNumber(number.replace)
        console.log(number[number.length - 1])
        let lastNumber = number[number.length - 1]
        setNumber(number.replace(lastNumber, ''))
    }

    const callStart =()=>{
        NativeModules.Bridge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiIyYWM0MTQ5ZTUzMWI1OTYzYzI2YTdhMzZmMzhjMDQzYi0xNjc5ODI1OTYwIiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYWxpY2UiLCJ2b2ljZSI6eyJvdXRnb2luZyI6eyJhcHBsaWNhdGlvbl9zaWQiOiJTSzAyN2FhZTE0MjI4OTdlYzQxYzcwYzQ1NTU5ZDA1NjRlIn19fSwiaWF0IjoxNjc5ODI1OTYwLCJleHAiOjE2Nzk4Mjk1NjAsImlzcyI6IjJhYzQxNDllNTMxYjU5NjNjMjZhN2EzNmYzOGMwNDNiIiwic3ViIjoiQUM4YTkyY2Q4ZjUxZjVjN2QxYjVhY2IwMDJhN2M2YmEzZSJ9.oP-WiHjhUt87iXTdrjh0RFlQOjFxOq41lDxhm9wBLdI")
        NativeModules.Bridge.sendCall("+923462231079", true)
    }
    return (
        <DialerStory
            number={number}
            dialNumber={dialNumber}
            backspace={backspace}
            cursor={cursor}
            setCursor={setCursor}
            isAnim={isAnim}
            setIsAnim={setIsAnim}
            isDialerOpen={isDialerOpen}
            setIsDialerOpen={setIsDialerOpen}
            callStart={callStart}
        />
    )
}