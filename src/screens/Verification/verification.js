import React, { useEffect, useState } from 'react';
import { VerificationStory } from './verificationStory';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../@core/services/utilsfunctions'
import { Colors } from '../../constants/colors';
import Util from '../../util';
import { CommonActions } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { tokenValue } from '../../@core/services/store';

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
    const [wrongCount, setwrongCount] = useState(3)

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.tokenReducer
    })
    const gotoNewPass = () => {
        console.log(email)
        // navigation.navigate('NewPass', { updatePass: false })
    }

    const gotoConnect = (email) => {
        setBorderColor(Colors.green)
        setwrongCount(3)
        if (params?.name == 'signup') {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "ConnectWith", params: { email: email.clientid } }],
                })
            );
        }
        if (params?.name == 'forgot') {
            navigation.navigate('NewPass', { updatePass: false, email: email })
        }
    }

    const startBarCount = () => {
        setResendDisable(true)
        let arr = -1
        barInterVal = setInterval(() => {
            // setBarCounter(arr + 1)
            arr = arr + 1
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
            setCounter(arr)
            if (arr == 0) {
                clearInterval(counterInterval)
                setCounterDisable(true)
                setEditable(true)
            }
        }, 1000)
    }

    const verifyCode = async (text) => {
        const params = {
            "email": email,
            "code": text
        }
        try {
            await axios._postApi('/verifycode', params).then(res => {
                console.log(res, wrongCount)
                if (res.status == 200) {
                    gotoConnect(res.data)
                    dispatch(tokenValue(res.data.token))
                }
                else if (res.status == 406 && wrongCount > 0) {
                    setwrongCount(wrongCount - 1)
                    setBorderColor('red')
                    Util.topAlertError("Invalid Code.")
                } else {
                    setBorderColor('red')
                    Util.topAlertError("You have tried multiple time your code is expired. Please attempt in 30 sec with new code.")
                    startCounter()
                    setCounterDisable(false)
                }
            })
        }
        catch (e) {
            console.log(e)
        }

    }

    const codeResend = async () => {
        try {
            await axios._postApi('/resetcode', params).then(res => {
                console.log(res, 'reset code')
                if (res.status = 200) {
                    startBarCount()
                    setwrongCount(3)
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