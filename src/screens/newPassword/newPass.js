import React, { useEffect, useState } from 'react';
import { NewPassStory } from './newPassStory';
import { useDispatch, useSelector } from 'react-redux'


export const NewPass = (props) => {
    const {
        route
    } = props
    const { params } = route

    console.log(params, 'http://localhost:8081/debugger-ui/')
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const [secureTextEntry3, setSecureTextEntry3] = useState(true);

    const toggleSecureEntry1 = () => {
        setSecureTextEntry1(!secureTextEntry1);
    };

    const toggleSecureEntry2 = () => {
        setSecureTextEntry2(!secureTextEntry2);
    };
    const toggleSecureEntry3 = () => {
        setSecureTextEntry3(!secureTextEntry3);
    };

    return (
        <NewPassStory
            updatePass={params.updatePass}
            oldPassword={oldPassword}
            getOldPassword={(e) => setOldPassword(e)}
            password={password}
            getPassword={(e) => { setPassword(e) }}
            confirmPassword={confirmPassword}
            getConfirmPassword={(e) => { setConfirmPassword(e) }}
            secureTextEntry1={secureTextEntry1}
            toggleSecureEntry1={toggleSecureEntry1}
            secureTextEntry2={secureTextEntry2}
            toggleSecureEntry2={toggleSecureEntry2}
            secureTextEntry3={secureTextEntry3}
            toggleSecureEntry3={toggleSecureEntry3}
        />
    )
}