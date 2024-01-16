import React, { useState, useEffect, useContext, useRef } from 'react';
import io, { Socket } from 'socket.io-client'; // Import the Socket type from socket.io-client
//import { SocketContext } from '../contexts/SocketContext';
{/*
function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  //const socket: Socket = useContext(SocketContext); // Specify the type of socket
 {/*
  // Handling new messages
  useEffect(() => {
    const messageListener = (newMessage: string) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };
    
    socket.on('message', messageListener);

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  const messageEndRef = useRef<HTMLDivElement>(null); // Specify the type of the ref

  // Scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button> 
    </div>
  );
}

export default Chat;
*/}