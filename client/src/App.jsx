import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

/*messages = [
  {
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  {
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "...",
    username: "nomnom"
  },
  {
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom"
  },
  {
    type: "incomingNotification",
    content: "Anonymous2 changed their name to NotFunny",
  },
]; */

// const userMessages = {

// const currentUser = {name: "Bob"};// optional. if currentUser is not defined, it means the user is Anonymous
// const messages = [
//     {
//       id: 1,
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       id: 2,
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ];
// // }


class App extends Component {

  constructor() {

    super();
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser:{name: "Bob"},
      messages:[] // messages coming from the server will be stored here as they arrive
    };

    this.addMessage = this.addMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);


    console.log('currentUser: ', this.state.currentUser.name);
    console.log('messages', this.state.messages);
  }

  componentDidMount() {

    console.log("componentDidMount <App />");

    setTimeout(() => {
      console.log("Simulating incoming message");
     // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);

    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.webSocket.onopen = (event) => {
      console.log('Connected to server!');
    };
    this.webSocket.onmessage = (receivedEvent) => {
        console.log('receivedeventData: ', receivedEvent.data);
        // code to handle incoming message
        this.addMessage(JSON.parse(receivedEvent.data));
      }
  }

  updateUsername(inputUsername) {

    this.setState({ currentUser: {name:inputUsername}});
  }

  // Send text to all users through the server
  sendMessage(inputMessage) {

        console.log('this.state: ', this.state);

  // Construct a message object containing the data the server needs to process the message from the chat client.
    const message = {
      type: "message",
      content: inputMessage,
      username: this.state.currentUser.name,
    };

    // Send the msg object as a JSON-formatted string.
    console.log('message client:', message);
    this.webSocket.send(JSON.stringify(message));
  }


  addMessage(message) {

    const oldMessageList = this.state.messages;

    const newMessage = {};
    newMessage.id = message.id;
    console.log('message.id:', message.id);
    newMessage.username = message.username;
    newMessage.content = message.content;

    const newMessageList = [...oldMessageList, newMessage];
    this.setState({ messages: newMessageList });
  }


  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} updateUsername={this.updateUsername}/>

      </div>
    );
  }
}

export default App;
