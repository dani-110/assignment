import React, { useEffect, useState } from 'react';
import { VerificationStory } from './verificationStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'
import { Colors } from '../../constants/colors';
import Util from '../../util';
import { CommonActions } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

export const Verification = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route

    let barInterVal;
    let counterInterval;

    const [code, setCode] = useState("");
    const [email, setEmail] = useState(params.email)
    const [borderColor, setBorderColor] = useState('')
    const [barCounter, setBarCounter] = useState(30)
    const [counter, setCounter] = useState(30)
    const [resendDisable, setResendDisable] = useState(false)
    const [counterDisable, setCounterDisable] = useState(true)
    const [editable, setEditable] = useState(true)

    const selector = useSelector((state) => {
        return state.tokenReducer
    })
    const gotoNewPass = () => {
        console.log(email)
        // navigation.navigate('NewPass', { updatePass: false })
    }

    const gotoConnect = () => {
        setBorderColor(Colors.green)
        if (params?.name == 'signup') {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "ConnectWith" }],
                })
            );
        }
        if (params?.name == 'forgot') {
            navigation.navigate('NewPass', { updatePass: false, email: email })
        }
        if (params?.name == 'connect') {
            navigation.navigate('TwilioConfigNum')
        }
    }

    const startBarCount = () => {
        setResendDisable(true)
        let arr = -1
        barInterVal = setInterval(() => {
            // setBarCounter(arr + 1)
            arr = arr + 1
            console.log(arr)
            setBarCounter(arr / 20)
            if (arr == 20) {
                clearInterval(barInterVal)
                setResendDisable(false)
            }
        }, 1000)
    }

    const startCounter = () => {
        setEditable(false)
        setCode("")
        setBorderColor('')
        let arr = 30
        counterInterval = setInterval(() => {
            arr = arr - 1
            console.log(arr)
            setCounter(arr)
            if (arr == 0) {
                clearInterval(counterInterval)
                setCounterDisable(true)
                setEditable(true)
            }
        }, 1000)
    }

    const verifyCode = async (text) => {
        // const params = {
        //     "email": email,
        //     "code": text
        // }
        // try {
        //     await axios._postApi('/verifycode', params).then(res => {
        //         console.log(res)
        //         if (res.status == 200) {
        //             if (res?.data?.error) {
        //                 setBorderColor('red')
        //                 if (res.data['error'] == "bad code.") {
        //                     Util.topAlertError("Invalid Code.")
        //                 } else if (res.data['error'] == "code expired due to multiple wrong retries") {
        //                     Util.topAlertError("You have tried multiple time. Please attempt in 30 sec.")
        //                     startCounter()
        //                     setCounterDisable(false)
        //                 }
        //             } else {
                        gotoConnect()
        //             }
        //         }
        //     })
        // }
        // catch (e) {
        //     console.log(e)
        // }

    }

    const codeResend = async () => {
        try {
            await axios._postApi('/resetcode', params).then(res => {
                console.log(res, 'reset code')
                if (res.status = 200) {
                    startBarCount()
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    const setVerifyCode = (e) => {
        setCode(e)
        console.log(e.length)
        if (e.length == 4) {
            console.log(e.length, 'sads')
            verifyCode(e)
            // gotoConnect()
        }
    }

    return (
        <VerificationStory
            code={code}
            getCode={(e) => { setVerifyCode(e) }}
            fromView={params?.name}
            borderColor={borderColor}
            barCounter={barCounter}
            resendDisable={resendDisable}
            counter={counter}
            counterDisable={counterDisable}
            editable={editable}
            codeResend={codeResend}
        />
        // <WebView
        //     source={{ html: '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' }}
        //     style={{ marginTop: 20 }}
        // />
    )
}