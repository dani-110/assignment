import React, { useEffect, useState } from 'react';
import { DialerStory } from './dialerStory';
import { useDispatch, useSelector } from 'react-redux'


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
        />
    )
}