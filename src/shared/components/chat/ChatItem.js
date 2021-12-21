import React, { useContext } from 'react';
// import { ChatActionContext } from './ChatContainer';
// import { MainChatActionContext } from '../../../pages/Mainpage/Chat/Chat';

function ChatItem({ ...props }) {
  //   const { startChat } = useContext(ChatActionContext);
  //   const { openChat } = useContext(MainChatActionContext);

  return (
    <div
      className="subchat"
      //   onClick={() => {
      //     if (props.type == 'small') {
      //       startChat(props.user_id);
      //     } else {
      //       openChat(props.user_id);
      //     }
      //   }}
    >
      <img src={props.image} />
      <b>{props.time}</b>
      <div className="info">
        <h4>{props.name}</h4>
        <p>{props.last_message}</p>
        {props.unread_messages > 0 && (
          <span className="outer">
            <span className="inner">{props.unread_messages}</span>
          </span>
        )}

        <div class={`status ${props.online ? 'online' : 'offline'}`}></div>
      </div>
      <hr />
    </div>
  );
}

export default ChatItem;
