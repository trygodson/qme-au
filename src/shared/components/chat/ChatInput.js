import React, { useState } from 'react';
import { Chat, SkipEnd } from 'react-bootstrap-icons';

function ChatInput({ ...props }) {
  const [message, setMessage] = useState('');

  const onMessageUpdate = e => {
    setMessage(e.target.value);
    props.MessageStatus();
  };

  const onClickHandler = () => {
    const isMessageProvided = message && message !== '';

    if (isMessageProvided) {
      props.sendMessage(message);
    } else {
      // alert('Please insert an user and a message.');
    }
    setMessage('');
  };

  return (
    <div className="row">
      <div className="bottom-chat-widgets">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={onMessageUpdate}
          onKeyDown={e => {
            console.log(e.key);
            if (e.key === 'Enter') {
              onClickHandler();
            }
          }}
        />
        <button onClick={onClickHandler}>
          <Chat />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
