import React, { useEffect, useState, useCallback } from 'react';
import { DashboardStory } from './dashboardStory';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


export const Dashboard = (props) => {
    const {
        navigation
    } = props
    const [date, setDate] = useState(moment().format("MMM D, YYYY"))
    const [calender, setCalender] = useState(false)

    return (
        <DashboardStory
            navigation={navigation}
            date={date}
            setDate={setDate}
            calender={calender}
            setCalender={setCalender}
        />
    )
}