// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });
let messageReceived = {};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(message) {

    messageReceived = JSON.parse(message);
    console.log('message type when received: ', messageReceived.type);
    messageReceived.id = uuidv1();

    if (messageReceived.type === 'postMessage') {
      messageReceived.type = 'incomingMessage';
      console.log('message type on server message: ', messageReceived.type);
      console.log('User ' + messageReceived.username + ' said ' + messageReceived.content);
    } else {
      if (messageReceived.type === 'postNotification') {
        messageReceived.type = 'incomingNotification';
        // console.log('message type: ', messageReceived.type);
        console.log('Notification: ', messageReceived.content);
      }
    };

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log('messageReceived: ', messageReceived);
        client.send(JSON.stringify(messageReceived));
      }
    });
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});


