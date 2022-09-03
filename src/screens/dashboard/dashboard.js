import React, { useEffect, useState, useCallback } from 'react';
import { DashboardStory } from './dashboardStory';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Animated } from 'react-native';


export const Dashboard = (props) => {
    const {
        navigation
    } = props

    const [startDate, setStartDate] = useState(getDay())
    const [endDate, setEndDate] = useState('')
    const [activeSections, setActiveSections] = useState([])
    const [showDialog, setShowDialog] = useState(false)

    function getDay() {
        return moment().calendar({
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            nextDay: '[Tomorrow]',
            lastWeek: 'ddd',
            sameElse: 'ddd'
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