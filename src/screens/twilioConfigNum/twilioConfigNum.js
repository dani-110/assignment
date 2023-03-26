import React, { useEffect, useState,useContext } from 'react';
import { TwilioConfigNumStory } from './twilioConfigNumStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";
import axios from '../../@core/services/utilsfunctions'
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-community/async-storage';


export const TwilioConfigNum = (props) => {

    const {TempInfo,setUserInfo,setTempInfo} = useContext(AuthContext);
    const {
        navigation,
        route
    } = props
    const {params}= route
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // const [items, setItems] = useState([]);
    const [items, setItems] = useState([
        // { label: '+923462231079', value: '+923462231079' },
        // { label: '+923422371239', value: '+923422371239' }
    ]);


useEffect(()=>{
    params.map((e)=>{
        items.push({ label: Object.values(e)[0], value: Object.values(e)[0] },)
    })
    setItems(items)
    },[])


    const gotoDashboard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "DashboardStack" }],
            })
        );
    }

    const updatePhone = async () => {
        console.log(TempInfo,"skds == >")
        const params ={
            phone:value,
            email:TempInfo.clientid
        }
        try {
            await axios._postApi('client/updatephone', params,TempInfo.token).then(res => {
                console.log(res, 'updatephone')
                if (res.status = 200) {
                    console.log(res.data)
                    // gotoDashboard()
                    setTempInfo({})
                    setUserInfo(TempInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(TempInfo));
                    // navigation.navigate('TwilioConfigNum',res.data.numbers.numbers)
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <TwilioConfigNumStory
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            items={items}
            setItems={setItems}
            gotoDashboard={gotoDashboard}
            updatePhone={updatePhone}
        />
    )
}