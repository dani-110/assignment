import React, { useEffect, useState } from 'react';
import { TwilioConfigNumStory } from './twilioConfigNumStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";
import axios from '../../@core/services/utilsfunctions'


export const TwilioConfigNum = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);


    const selector = useSelector((state) => {
        return state.tokenReducer.token
    })


    useState(() => {
        console.log(params.email, params.number)
        params?.number?.map((e, i) => {
            items.push({
                label: e['Phone' + (i + 1)],
                value: e['Phone' + (i + 1)]
            })
            setItems(items.concat())
        })
    }, [])

    const gotoDashboard = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "DashboardStack" }],
            })
        );
    }


    const setTwilioConfig = async () => {
        console.log('dsadsa', value)
        const param = {
            ...params?.data,
            "phone": value

        }
        try {
            await axios._postApi('/updatessid', param, selector).then(res => {
                console.log(res, 'updatessid')
                if (res.status = 200) {
                    gotoDashboard()
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
            setTwilioConfig={setTwilioConfig}
        />
    )
}