import React, { useEffect, useRef, useState } from 'react';
import { ContactStory } from './contactStory';
import { useDispatch, useSelector } from 'react-redux'
import { filterValue } from '../../@core/services/store';
import Contacts from 'react-native-contacts';
import { AlphabetList } from "react-native-section-alphabet-list";

export const Contact = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route

    const [constactList, setContactList] = useState([])
    const [search, setSearch] = useState('')
    const selector = useSelector((state) => {
        return state?.contactReducer?.contactList
    })
    useEffect(() => {
        console.log(selector)
        setContactList(selector)
    }, [])

    const filter = (text) => {
        let arr = [];
        selector.filter(val => {
            if (val.value.toLowerCase().includes(text.toLowerCase())) {
                arr.push(val)
                setContactList(arr.concat())
            }
        })

    }

    return (
        <ContactStory
            constactList={constactList}
            filter={filter}
        />
    )
}