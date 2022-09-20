import React, { useEffect, useState } from 'react';
import { ChatStory } from './chatStory';
import { useDispatch, useSelector } from 'react-redux'
import { infoValue } from '../../@core/services/store';

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
    const [showDialog, setShowDialog] = useState(false)
    const [constactList, setContactList] = useState([])
    const [search, setSearch] = useState('')
    const [selectedUser, setSelectedUser] = useState([])

    const contactSelector = useSelector((state) => {
        return state?.contactReducer?.contactList
    })

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.infoReducer.isInfo
    })

    useEffect(() => {
        setShowDialog(selector)
    }, [selector])


    const onClose = (val) => {
        dispatch(infoValue(val))
    };

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

    const filter = (text) => {
        setSearch(text)
        let arr = [];
        contactSelector.filter(val => {
            if (val.value.toLowerCase().includes(text.toLowerCase())) {
                arr.push(val)
                setContactList(arr.concat())
            }
        })
    }

    const userSelect = (item) => {
        let status = selectedUser.some(vendor => vendor['value'] === item.value)
        if (!status) {
            selectedUser.push(item)
            setSelectedUser(selectedUser.concat())
        }

    }
    const onRemove = (item) => {
        let key = selectedUser.findIndex(
            (c) => c.key === item.key
        )
        selectedUser.splice(key, 1)
        setSelectedUser(selectedUser.concat())
    }

    return (
        <ChatStory
            text={text}
            setText={setText}
            newChat={newChat}
            sendMsg={sendMsg}
            messages={messages}
            showDialog={showDialog}
            onClose={onClose}
            filter={filter}
            constactList={constactList}
            search={search}
            setSearch={setSearch}
            userSelect={userSelect}
            selectedUser={selectedUser}
            onRemove={onRemove}
        />
    )
}