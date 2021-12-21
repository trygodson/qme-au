import React from 'react';

function ChatMessage(props) {
  const my_id = props.patient_id;
  return (
    <div>
      {props.from == my_id ? (
        <div className="mine messages">
          <div className="message">{props.message}</div>
        </div>
      ) : (
        <div className="yours messages">
          <div className="message other">{props.message}</div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
