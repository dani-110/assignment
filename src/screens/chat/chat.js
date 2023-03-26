import React, { useEffect,useContext, useState } from 'react';
import { ChatStory } from './chatStory';
import { useDispatch, useSelector } from 'react-redux'
import { contactValue, infoValue } from '../../@core/services/store';
import Contacts from 'react-native-contacts';
import Util from '../../util';
import _ from "lodash";
import {AuthContext} from '../../context/authContext';
import axios from '../../@core/services/utilsfunctions'
import { NotificationBarContext } from '../../context/notificationBar';

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

    const {userInfo} = useContext(AuthContext);
    const { showBar} = useContext(NotificationBarContext);
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
    const [search, setSearch] = useState()
    const [selectedUser, setSelectedUser] = useState([])
    const [contactDetail, setContactDetail] = useState({})

    const [saveDialog, setSaveDialog] = useState(false)


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [isEditable, setIsEditable] = useState(false)

    const contactSelector = useSelector((state) => {
        return state?.contactReducer?.contactList
    })

    const dispatch = useDispatch()
    const selector = useSelector((state) => {
        return state.infoReducer.isInfo
    })

    useEffect(() => {
        console.log(params?.data?.name)
        // getContact()
    }, [])

    useEffect(() => {
        if (params?.data?.name == "Unknown Contact") {
            setSaveDialog(selector)
        } else {
            setShowDialog(selector)
        }


    }, [selector])


    const onClose = (val) => {
        dispatch(infoValue(val))
        setTimeout(() => {
            setIsEditable(false)
        }, 1000)
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

    const getContact = () => {
        if (params?.data?.name != "Unknown Contact") {
            Contacts.getContactsByPhoneNumber("(888) 555-5513").then(res => {
                console.log(res)
                setContactDetail(res[0])
                setFirstName(res[0].givenName)
                setLastName(res[0].familyName)
                setEmail(res[0].emailAddresses[0]?.email)
                setPhone(res[0].phoneNumbers[0]?.number)
            })
        }

    }

    const validateForm = () => {
        if (_.isEmpty(firstName)) {
            Util.topAlertError("First Name is empty")
            return false
        } else if (_.isEmpty(phone)) {
            Util.topAlertError("Phone Number is empty")
            return false
        } else if (email.length > 0 && !Util.isEmailValid(email)) {
            Util.topAlertError("email is not in correct format")
            return false
        }
        return true
    }

    const addContact = () => {
        console.log(contactSelector)
        if (validateForm()) {
            var newPerson = {
                emailAddresses: [{
                    label: "home",
                    email: email,
                }],
                phoneNumbers: [{
                    label: "mobile",
                    number: phone
                }],
                familyName: lastName,
                givenName: firstName,
            }
            Contacts.addContact(newPerson).then(res => {
                let arr = [...contactSelector]
                arr.push({
                    value: res?.givenName + " " + res?.familyName,
                    key: contactSelector.length,
                    number: res?.phoneNumbers[0]?.number,
                    e: res
                })
                dispatch(contactValue(arr.concat()))
                onClose(false)
            })
        }
    }

    const updateContact = () => {
        setIsEditable(false)
        // Contacts.getAll().then(contacts => {
        //     // update the first record
        //     let someRecord = contacts[0]
        //     console.log(someRecord)
        // })
        console.log(contactDetail)
        contactDetail.givenName = firstName
        contactDetail.familyName = lastName
        contactDetail.emailAddresses = [{
            label: "home",
            email: email
        }]
        contactDetail.phoneNumbers = [{
            label: "mobile",
            number: phone
        }]
        Contacts.updateContact(contactDetail).then((res) => {
            console.log(res)
        })

    }

    const validateSms = () => {
        if (_.isEmpty(search)) {
            showBar("Please select atleast one number",'error')
            return false
        }else if (_.isEmpty(text)) {
            return false
        }
        return true
    }

    const sendSms = async () => {
        if(validateSms()){
            const params ={
                "ssid": userInfo.data.TwillioSSID,
                "authToken": userInfo.data.TwillioAuthKey,
                "sms": text,
                "from":"+17409088060",
                "to":search
            }
            console.log(params.authToken, userInfo.token)
            try {
                await axios._postApi('twilio/sendSms', params,userInfo.token).then(res => {
                    console.log(res, 'sendSms')
                    if (res.status = 200) {
                        console.log(res.data)
                    }
                })
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <ChatStory
            text={text}
            setText={setText}
            newChat={newChat}
            sendMsg={sendSms}
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
            contactDetail={contactDetail}
            saveDialog={saveDialog}
            setSaveDialog={setSaveDialog}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            addContact={addContact}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            updateContact={updateContact}
        />
    )
}