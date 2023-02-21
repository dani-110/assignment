import React, { useEffect, useRef, useState } from 'react';
import { CallLogsStory } from './callLogsStory';
import { useDispatch, useSelector } from 'react-redux'
import { filterValue } from '../../@core/services/store';


export const CallLogs = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route

    const [activeSections, setActiveSections] = useState([-1])

    const [filterType, setFilterType] = useState(['All', 'Missed', 'Incoming', 'Outgoing', 'Voicemail'])
    const [isSelectedFilter, setIsSelectedFilter] = useState('All')

    const [showDialog, setShowDialog] = useState(false)

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.filterReducer.isFilter
    })

    useEffect(() => {
        setShowDialog(selector)
    }, [selector])


    const onClose = (val) => {
        dispatch(filterValue(val))
    };

    const setFilterCheck = (i) => {
        setIsSelectedFilter(filterType[i])
        onClose()
    }

    return (
        <CallLogsStory
            activeSections={activeSections}
            setActiveSections={setActiveSections}
            onClose={onClose}
            filterType={filterType}
            isSelectedFilter={isSelectedFilter}
            setFilterCheck={setFilterCheck}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
        />
    )
}