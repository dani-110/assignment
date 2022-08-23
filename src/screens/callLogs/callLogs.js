import React, { useEffect, useState } from 'react';
import { CallLogsStory } from './callLogsStory';
import { useDispatch, useSelector } from 'react-redux'


export const CallLogs = (props) => {
    const [activeSections, setActiveSections] = useState([-1])

    return (
        <CallLogsStory
            activeSections={activeSections}
            setActiveSections={setActiveSections}
        />
    )
}