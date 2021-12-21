import React, { useState, createContext, useContext, useEffect } from 'react'
import './chat.scss'
import _chatlist from '../../../assets/jsondata/chat_list.json'
import Chatbox from './ChatBox';
import ChatList from './ChatList';
import _chatmessages from '../../../assets/jsondata/chat_messages.json'

export const ChatActionContext = createContext({});

function ChatContainer() {
    const [userId, setUserId] = useState(null);
    const [chat, setChat] = useState(false); // change to default 'false'
    const [user, setUser] = useState({name:'John Doe',image:'http://localhost:3000/male.jpg'})
    const [chatMessages, setChatMessages] = useState(_chatmessages);

    const startChat = (user_id) => {
        setUserId(user_id);
        setChat(true);
    }

    const closeChat = () => {
        setUserId(null);
        setChat(false);
    }

    useEffect(()=>{
        // fetch user name and picture
        // fetch and update chatMessages
      }, [userId])

    const action = useContext(ChatActionContext);
    action.startChat = startChat;

    return (
        <div className="chat_list">
            {!chat ? (
                <ChatActionContext.Provider value = {action}>
                    <ChatList type = {`small`} />
                </ChatActionContext.Provider>
            ) : (
                <Chatbox user = {user} chat_messages = {chatMessages} closeChat={closeChat} type = {`small`} userId = {userId} />
            )}
            {}
        </div>
    )
}

export default ChatContainer
