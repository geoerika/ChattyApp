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
let nrOfClients = {};
let numberofClients = 0;
// let colourArray = ['#00cc00', '#cc0052', '#0000cc', '#8600b3'];

let colourArray = ['red', 'blue', 'green', 'purple'];


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  numberofClients = wss.clients.size;
  nrOfClients = {numberOfClients:numberofClients};
  let colourClient = colourArray[Math.floor(Math.random()*colourArray.length)];
  console.log('colourClient: ', colourClient);
  clientColour = {type:'colour', colour: colourClient};
  console.log('clientColour: ', clientColour);
  console.log('nrOfClients at connect: ', nrOfClients);

  ws.send(JSON.stringify(clientColour));

  if (nrOfClients) {

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log('messageReceived: ', messageReceived);
        client.send(JSON.stringify(nrOfClients));
      }
    });
  }

  console.log('Client connected');
  ws.on('message', function incoming(message) {

    messageReceived = JSON.parse(message);
    console.log('message when received: ', messageReceived);
    // console.log('message type when received: ', messageReceived.type);
    messageReceived.id = uuidv1();

    if (messageReceived.type === 'postMessage') {
      messageReceived.type = 'incomingMessage';
      // console.log('message type on server message: ', messageReceived.type);
      // console.log('User ' + messageReceived.username + ' said ' + messageReceived.content);
    } else {
      if (messageReceived.type === 'postNotification') {
        messageReceived.type = 'incomingNotification';
        // console.log('message type: ', messageReceived.type);
        // console.log('Notification: ', messageReceived.content);
      }
    };

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log('messageReceived: ', messageReceived);
        client.send(JSON.stringify(messageReceived));
      }
    });
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    numberofClients = wss.clients.size;
   nrOfClients = {numberOfClients:numberofClients};
   // console.log('nrOfClients at connect: ', nrOfClients);
  if (nrOfClients) {

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log('messageReceived: ', messageReceived);
        client.send(JSON.stringify(nrOfClients));
      }
    });
  }
  });
});


