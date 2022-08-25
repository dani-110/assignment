import React, { useEffect, useState } from 'react';
import { ChatStory } from './chatStory';
import { useDispatch, useSelector } from 'react-redux'

const obj = [
    {
        name: 'Faizan Siddiqui',
        msg: 'Hello Faizan, any update on the project',
        number: '+923000569491',
        time: '9:30 pm',
        date: '03 Aug 2022',
        unread: 3,
        side: 1
    },
    {
        name: 'Unknown Contact',
        msg: 'I checked but its not working',
        number: '+923000569491',
        time: '9:30 pm',
        date: '03 Aug 2022',
        unread: 0,
        side: 1
    },
    {
        name: 'Haider Ali Baig',
        msg: 'Not sure about it',
        number: '+923000569491',
        time: '9:30 pm',
        date: '03 Aug 2022',
        unread: 0,
        side: 2
    },
    {
        name: 'Haider Ali Baig',
        msg: 'voicemail',
        number: '+923000569491',
        time: '9:30 pm',
        date: '03 Aug 2022',
        unread: 1,
        side: 1
    }
]
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
    const [messages, setMessages] = useState(obj)

    const sendMsg = () => {
        let newMsg = {
            name: 'name',
            msg: text,
            number: '+923000569491',
            time: '9:30 pm',
            date: '03 Aug 2022',
            unread: 1,
            side: 1
        }
        messages.push(newMsg)
        setMessages(messages.concat())
        setText('')

    }
    return (
        <ChatStory
            text={text}
            setText={setText}
            newChat={newChat}
            sendMsg={sendMsg}
            messages={messages}
        />
    )
}