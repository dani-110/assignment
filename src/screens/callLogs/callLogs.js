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
    const modalizeRef = useRef(null);

    const [filterType, setFilterType] = useState(['All', 'Missed', 'Incoming', 'Outgoing', 'Voicemail'])
    const [isSelectedFilter, setIsSelectedFilter] = useState('All')

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.filterReducer.isFilter
    })

    useEffect(() => {
        selector ? onOpen() : onClose()
    }, [selector])

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onClose = () => {
        dispatch(filterValue(false))
        modalizeRef.current?.close();
    };

    const setFilterCheck = (i) => {
        setIsSelectedFilter(filterType[i])
        onClose()
    }

    return (
        <CallLogsStory
            activeSections={activeSections}
            setActiveSections={setActiveSections}
            modalizeRef={modalizeRef}
            onOpen={onOpen}
            onClose={onClose}
            filterType={filterType}
            isSelectedFilter={isSelectedFilter}
            setFilterCheck={setFilterCheck}
        />
    )
}