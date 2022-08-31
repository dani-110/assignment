import React, { useEffect, useState } from 'react';
import { TwilioConfigNumStory } from './twilioConfigNumStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";


export const TwilioConfigNum = (props) => {
    const {
        navigation
    } = props
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '+923462231079', value: '+923462231079' },
        { label: '+923422371239', value: '+923422371239' }
    ]);

    const gotoDashboard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "DashboardStack" }],
            })
        );
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
        />
    )
}