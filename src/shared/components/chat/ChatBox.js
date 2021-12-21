import React, { useEffect, useRef, useState } from 'react';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { v4 as uuid } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css';
import { useAuthState } from '../../../context/useAuthContext';
import axios from 'axios';

const bounceAnimation = keyframes`${fadeIn}`;
const _style = styled.div`
  animation: 1s ${bounceAnimation};
`;

const ROOT_CSS = css({
  height: 400,
});

function ChatBox(props) {
  const doctor_id = 1;
  const patient_id = 2;
  const patient_uid = 'Michael Kee';

  const { user } = useAuthState();
  user.name = 'John Doe'; // comment this later
  user.image = 'http://localhost:3000/male.jpg'; // comment this later
  const doctor_name = 'Dr. Valentine'; // get value from props
  const doctor_image = 'http://localhost:3000/male.jpg'; // get value from props

  const [connection, setConnection] = useState(null);
  const [room, setRoom] = useState('');
  const [status, setStatus] = useState('Online');
  const [chatMessages, setChatMessages] = useState([]);
  const [roomKey, setRoomKey] = useState(null);
  const latestChat = useRef(null);

  const messagesEndRef = useRef(null);

  const defaultMessagesNum = 1;
  const [messagesLimit, setMessagesLimit] = useState(defaultMessagesNum);

  latestChat.current = chatMessages;

  console.log(chatMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const joingroup = async boardId => {
    console.log(boardId);
    setRoom(boardId);
    if (connection.connectionStarted) {
      try {
        connection.invoke('SubscribeToOrderChat', boardId);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  const sendMessage = async message => {
    const chatMessage = {
      user: patient_id,
      message: message,
      referenceId: room,
      from: patient_id,
      to: doctor_id,
      fromname: user.name,
      toname: doctor_name,
      fromimage: user.image,
      toimage: doctor_image,
    };

    const ChatStatus = {
      isTyping: false,
      message: '',
      referenceId: room,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send('SendMessage', chatMessage);
        await connection.send('UserStatus', ChatStatus);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  const MessageStatus = async () => {
    const ChatStatus = {
      isTyping: true,
      message: `${patient_id} typing...`,
      referenceId: room,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send('UserStatus', ChatStatus);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  const handleScroll = e => {
    // console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
    // const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    // // if (bottom) {
    // //   console.log('cool');
    // // }
    console.log('topped scrollbar');
    if (e.target.scrollTop == 0) {
      // console.log('Get more data when scroll hits the top');
      const newLimit = messagesLimit + defaultMessagesNum;
      console.log('newLimit', newLimit);
      setMessagesLimit(newLimit);

      axios
        .get(
          `http://onemedy.peerpro.co/api/Chat?id=${roomKey}&Userid=${patient_id}&PageNumber=${newLimit}`,
        )
        .then(({ data }) => {
          // console.log('fetched', data);
          if (data.data.length > 0) {
            setChatMessages([...data.data.reverse(), ...chatMessages]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://onemedy.peerpro.co/hubs/chat')
      .withAutomaticReconnect()
      .build();
    console.log(newConnection);

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      console.log(connection.connectionStarted);
      connection
        .start()
        .then(result => {
          console.log('Connected!');

          // this is key unique to this two users,store in DB to avoid duplicates => once doctor sees this, he gets the key and joins the group
          // check the DB if one already exists else create a new one

          // generateRoomKey with API
          axios
            .get(
              `http://onemedy.peerpro.co/api/Chat/checkchatroom?toid=${doctor_id}&fromid=${patient_id}&toimage=${doctor_image}&fromimage=${user.image}&toname=${doctor_name}&fromname=${user.name}`,
            )
            .then(({ data }) => {
              const _roomKey = data.referenceId;
              setRoomKey(_roomKey);
              joingroup(_roomKey);

              axios
                .get(
                  `http://onemedy.peerpro.co/api/Chat?id=${_roomKey}&Userid=${patient_id}&PageNumber=${messagesLimit}`,
                )
                .then(({ data }) => {
                  setChatMessages(data.data.reverse());
                })
                .catch(err => {
                  console.log(err);
                });
            });
          // joingroup(roomKey);

          connection.on('Status', status => {
            const arr = status.message.split(' ');
            console.log(Number(arr[0]));
            if (arr[0] != patient_id) {
              console.log('the other person is typing');
              if (status.isTyping) {
                setStatus(arr[1]);
              } else {
                setStatus('Online');
              }
            } else {
              console.log('you are typing');
              setStatus('Online'); // or Offline
            }
          });

          connection.on('ReceiveOrderMessage', message => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            setChatMessages(updatedChat);
            // scrollToBottom();
            // window.scrollTo(0, 0);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    } else {
      console.log('error connecting...');
    }
  }, [connection]);

  return (
    <_style className={`chatbox ${props.type == 'big' && 'chatbox_GF5DR'}`}>
      <div className="row">
        <div className="info-bar">
          <img src={props.user.image} />
          <i className="bx bx-exit" onClick={() => props.closeChat()}></i>
          <div className="user-info">
            <h4>{props.name}</h4>
            <p>{status}</p>
          </div>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className={`top-chat-widgets`} onScroll={handleScroll}>
          {/* <div className="chat">
            {chatMessages.map(props => (
              <ChatMessage key={uuid()} patient_id={patient_id} {...props} />
            ))}
            <div style={{ height: '10px' }} ref={messagesEndRef}></div>
          </div> */}
          <ScrollToBottom className={ROOT_CSS} id="scrollableDiv">
            <div className="chat">
              {chatMessages.map(props => (
                <ChatMessage key={uuid()} patient_id={patient_id} {...props} />
              ))}
            </div>
          </ScrollToBottom>
        </div>
      </div>
      {connection != null && connection.connectionStarted ? (
        <ChatInput sendMessage={sendMessage} MessageStatus={MessageStatus} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <i style={{ fontSize: '15px' }}>Please wait...</i>
        </div>
      )}
    </_style>
  );
}

export default ChatBox;
