import React, { useEffect, useState } from 'react';
import { SettingsStory } from './settingsStory';
import { useDispatch, useSelector } from 'react-redux'


export const Settings = (props) => {
    const {
        navigation
    } = props
    const [name, setName] = useState("Faizan UL Haq Siddiqui");
    const [email, setEmail] = useState("faizan@livewirelabs.co");
    const [company, setCompany] = useState("LiveWire Labs");
    const [domain, setDomain] = useState("");
    const [ssid, setSsid] = useState("Faizan UL Haq Siddiqui");
    const [authToken, setAuthToken] = useState("");
    const [phone, setPhone] = useState("8877656655");
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [existing, setExisting] = useState("");
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
        <SettingsStory
            name={name}
            getName={(e) => { setName(e) }}
            email={email}
            getEmail={(e) => { setEmail(e) }}
            company={company}
            getCompany={(e) => { setCompany(e) }}
            domain={domain}
            getDomain={(e) => { setDomain(e) }}
            ssid={ssid}
            getSsid={(e) => { setSsid(e) }}
            phone={phone}
            getPhone={(e) => { setPhone(e) }}
            visible={visible}
            setVisible={(e) => setVisible(e)}
            password={password}
            getPassword={(e) => { setPassword(e) }}
            confirmPassword={confirmPassword}
            getConfirmPassword={(e) => { setConfirmPassword(e) }}
            existing={existing}
            getExisting={(e) => setExisting(e)}
            secureTextEntry1={secureTextEntry1}
            toggleSecureEntry1={toggleSecureEntry1}
            secureTextEntry2={secureTextEntry2}
            toggleSecureEntry2={toggleSecureEntry2}
            secureTextEntry3={secureTextEntry3}
            toggleSecureEntry3={toggleSecureEntry3}
            navigation={navigation}
            authToken={authToken}
            getAuthToken={(e) => setAuthToken(e)}
        />
    )
}