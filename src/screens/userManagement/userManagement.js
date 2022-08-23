import React, { useEffect, useState } from 'react';
import { UserManagementStory } from './userManagementStory';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from "@react-navigation/native";


export const UserManagement = (props) => {
    const {
        navigation
    } = props
    const [ssid, setSsid] = useState("");
    const [authToken, setAuthToken] = useState("");
    const [revokeDialog, setRevokeDialog] = useState(false)
    const [detachDialog, setDetachDialog] = useState(false)
    const [assignDialog, setAssignDialog] = useState(false)
    const [memberDialog, setMemberDialog] = useState(false)

    const [teamMembers, setTeamMembers] = useState([
        {
            name: '',
            email: ''
        }
    ])

    const setTeamField = (val, param, index) => {
        console.log(val, param, index)
        teamMembers[index][param] = val
        setTeamMembers(teamMembers.concat())
    }
    const addMore = () => {
        teamMembers.push({ name: '', email: '' })
        setTeamMembers(teamMembers.concat())
    }
    const removeMembers = (index) => {
        teamMembers.splice(index, 1)
        setTeamMembers(teamMembers.concat())
    }
    return (
        <UserManagementStory
            revokeDialog={revokeDialog}
            setRevokeDialog={setRevokeDialog}
            detachDialog={detachDialog}
            setDetachDialog={setDetachDialog}
            assignDialog={assignDialog}
            setAssignDialog={setAssignDialog}
            memberDialog={memberDialog}
            setMemberDialog={setMemberDialog}
            teamMembers={teamMembers}
            setTeamField={setTeamField}
            addMore={addMore}
            removeMembers={removeMembers}
        />
    )
}