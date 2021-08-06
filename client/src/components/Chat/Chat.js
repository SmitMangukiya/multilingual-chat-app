import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css';
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [code, setCode] = useState('en');
    
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        // console.log(socket);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnectted');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(messages);
            console.log(message);
            setMessages((prev_msg) => {
                return [...prev_msg, message];
            });
        });
    }, []);
    
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }
    
    // console.log(messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} code={code} setCode={setCode} />
                <Messages messages={messages} name={name} code={code} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    );
};

export default Chat;