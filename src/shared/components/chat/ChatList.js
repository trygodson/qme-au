import React from 'react'
import _chatlist from '../../../assets/jsondata/chat_list.json'
import ChatItem from './ChatItem'
import { bounceInRight,fadeIn } from "react-animations"
import styled, { keyframes } from 'styled-components';



function ChatList({...props}) {

    const bounceAnimation = keyframes`${(props.type=='small')?bounceInRight:''}`;
    const _style = styled.div`animation: 1s ${bounceAnimation};`;

    return _chatlist.map(chats=><_style><ChatItem key = {chats.id} {...chats} {...props} /></_style>)
}

export default ChatList
