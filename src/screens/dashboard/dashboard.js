import React, { useEffect, useState } from 'react';
import { DashboardStory } from './dashboardStory';
import { useDispatch, useSelector } from 'react-redux'


export const Dashboard = (props) => {
    const {
        navigation
    } = props
    return (
        <DashboardStory
            navigation={navigation}
        />
    )
}