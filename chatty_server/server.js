// Server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// set the port to 3001
const PORT = 3001;

// create a new express server
const server = express()
   // make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// create the WebSockets server
const wss = new WebSocket.Server({ server });
// define initial variables for message and nr of users connected
let messageReceived = {};
let nrOfClients = {};
let numberofClients = 0;

// array of user colours
let colourArray = ['red', 'blue', 'green', 'purple', 'orange', 'brown'];

// set up a callback that will run when a client connects to the server
// when a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  // set a random colour of client at connection
  let colourClient = colourArray[Math.floor(Math.random()*colourArray.length)];
  // create message type colour to set colour to a client
  clientColour = {type:'colour', colour: colourClient};
  // store the number of clients connected to the server in numberofClients
  numberofClients = wss.clients.size;
  // create object with number of Clients to be sent to the clients
  nrOfClients = {numberOfClients:numberofClients};

  // send assigned colour to a connected user
  ws.send(JSON.stringify(clientColour));

  if (nrOfClients) {
    // send the nr of connected users to all clients
    broadcastMessage(nrOfClients);
  }

  // print message at connection
  console.log('Client connected');
  ws.on('message', handleReceivedMessage);


  // set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    console.log('Client disconnected');
    // reset the number of connected users
    numberofClients = wss.clients.size;
    nrOfClients = {numberOfClients:numberofClients};

    if (nrOfClients) {
      // send the updated nr of connected users
      broadcastMessage(nrOfClients);
    }
  });
});

// method to handle incoming messages
const handleReceivedMessage = (message) => {

  // the socket event data is encoded as a JSON string.
  // this line turns it into an object
  messageReceived = JSON.parse(message);
  // assign a unique id to the message
  messageReceived.id = uuidv1();

  // if messages received are post messages
  if (messageReceived.type === 'postMessage') {

    // set type of message to be sent back as incoming message
    messageReceived.type = 'incomingMessage';
    // create a regular expression to extract the image url form a message
    let regex = new RegExp(/(\/images\/(.+)(\.jpeg|png|gif))/g);
    // store matches for the url
    let matches = messageReceived.content.match(regex);

    // if any url found
    if (matches) {

    // store url in the content of the message
    messageReceived.content = matches[0];
    // set type of message to be sent back as image
    messageReceived.type = 'image';

    }
  } else {

    // if messages received are notifications for user change
    if (messageReceived.type === 'postNotification') {
        // set type of message to be sent back as incoming notification
        messageReceived.type = 'incomingNotification';
    }
  };

  // send back the message to all clients
  broadcastMessage(messageReceived);
}

// method to broadcast a message to all connected clients
const broadcastMessage = (message) => {

  // iterate through the set of clients connected to the server
  wss.clients.forEach(function each(client) {
    // check of a client is connected
    if (client.readyState === WebSocket.OPEN) {
      // send message to all connected clients
      client.send(JSON.stringify(message));
    }
  });
}





