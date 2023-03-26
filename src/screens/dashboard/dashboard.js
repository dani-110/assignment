import React, { useEffect, useState, useContext } from 'react';
import { DashboardStory } from './dashboardStory';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Animated } from 'react-native';
import {AuthContext} from '../../context/authContext';

export const Dashboard = (props) => {
    const {
        navigation
    } = props

    const {userInfo} = useContext(AuthContext);

    const [startDate, setStartDate] = useState(getDay())
    const [endDate, setEndDate] = useState('')
    const [activeSections, setActiveSections] = useState([])
    const [showDialog, setShowDialog] = useState(false)

    console.log(userInfo.token,"userInfo===?>")
    function getDay() {
        return moment().calendar({
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: 'MMM Do, YYYY',
            sameElse: 'MMM Do, YYYY'
        })
    }
    return (
        <DashboardStory
            navigation={navigation}
            activeSections={activeSections}
            setActiveSections={setActiveSections}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
        />
    )
}