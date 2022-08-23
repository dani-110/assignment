import React, { useEffect, useState } from 'react';
import { ConversationStory } from './conversationStory';
import { useDispatch, useSelector } from 'react-redux'


export const Conversation = (props) => {
    const {
        navigation
    } = props

    const gotoChat = () => {
        navigation.navigate('Chat', { new: false })
    }
    return (
        <ConversationStory
            navigation={navigation}
            gotoChat={gotoChat}
        />
    )
}