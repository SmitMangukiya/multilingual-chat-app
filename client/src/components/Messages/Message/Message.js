import React, { useState, useEffect } from 'react';
import './Message.css';
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
var subscriptionKey = "0b7a39ab93224aa3a7cd6a909f51a3c6";
var endpoint = "https://api.cognitive.microsofttranslator.com";
var location = "eastus2";

const Message = ({ message: { text, user }, name, code }) => {
  console.log(text);
  let isSentByCurrentUser = false;
  const [msg, setMsg] = useState(text);
  const [loading, setLoading] = useState(true);

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  useEffect(() => {
    axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': '3.0',
        'to': code
      },
      data: [{
        'text': text
      }],
      responseType: 'json'
    }).then(function (response) {
        console.log(response.data[0].translations[0].text);
        setMsg(response.data[0].translations[0].text);
        setLoading(false);
    });
  }, []);

  // console.log(text, code);
  // text = translateMessage(text, code);
  return (
    loading ?(
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">...</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">loading</p>
      </div>
    </div>
    ):
    (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{msg}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{msg}</p>
          </div>
          <p className="sentText pl-10 ">{user}</p>
        </div>
      )
      )
  );
}

export default Message;