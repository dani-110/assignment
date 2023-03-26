import React, { useEffect, useState } from 'react';
import { ConversationStory } from './conversationStory';
import { useDispatch, useSelector } from 'react-redux'


export const Conversation = (props) => {
    const {
        navigation
    } = props

    const gotoChat = (data) => {
        console.log(data)
        navigation.navigate('Chat', { new: false, data })
    }
    return (
        <ConversationStory
            navigation={navigation}
            gotoChat={gotoChat}
        />
    )
}