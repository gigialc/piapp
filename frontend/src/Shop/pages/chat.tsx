// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata , CommunityType} from "../components/Types";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

/* DEVELOPER NOTE:
* this page facilitates the purchase of pies for pi. all of the callbacks
* can be found on the Payments.tsx file in components file. 
*/
const socket = io('http://localhost:3333'); // Replace with your server address

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    socket.on('message', (newMessage: string) => {
      setMessages([...messages, newMessage]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;