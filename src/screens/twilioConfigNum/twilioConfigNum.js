import React, { useEffect, useState,useContext } from 'react';
import { TwilioConfigNumStory } from './twilioConfigNumStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";
import axios from '../../@core/services/utilsfunctions'
import {AuthContext} from '../../context/authContext';


export const TwilioConfigNum = (props) => {

    const {userInfo} = useContext(AuthContext);
    const {
        navigation,
        route
    } = props
    const {params}= route
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // const [items, setItems] = useState([]);
    const [items, setItems] = useState([
        { label: '+923462231079', value: '+923462231079' },
        { label: '+923422371239', value: '+923422371239' }
    ]);


// useEffect(()=>{
//     params.map((e)=>{
//         items.push({ label: Object.values(e)[0], value: Object.values(e)[0] },)
//     })
//     setItems(items)
//     },[])


    const gotoDashboard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "DashboardStack" }],
            })
        );
    }

    const updatePhone = async () => {
        // console.log(value)
        // const params ={
        //     phone:value,
        //     email:userInfo.clientid
        // }
        // try {
        //     await axios._postApi('/updatephone', params,userInfo.token).then(res => {
        //         console.log(res, 'updatephone')
        //         if (res.status = 200) {
        //             console.log(res.data)
                    gotoDashboard()
                    // navigation.navigate('TwilioConfigNum',res.data.numbers.numbers)
        //         }
        //     })
        // }
        // catch (e) {
        //     console.log(e)
        // }
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