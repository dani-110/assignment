import React, { useEffect, useState } from 'react';
import { ChatStory } from './chatStory';
import { useDispatch, useSelector } from 'react-redux'


export const Chat = (props) => {
    const {
        navigation,
        route
    } = props
    const {
        params
    } = route
    const [text, setText] = useState('')
    const [newChat, setNewChat] = useState(params.new)
    return (
        <ChatStory
            text={text}
            setText={setText}
            newChat={newChat}
        />
    )
}