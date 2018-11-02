import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor() {

    super();
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser:{name: "Bob"},
      messages:[], // messages coming from the server will be stored here as they arrive
      userNumbertoDisplay:'',
      clientColour:'black',
      userColour:'black'

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
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type:"incomingMessage"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);

    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.webSocket.onopen = (event) => {
      console.log('Connected to server!');
    };

    this.webSocket.onmessage = (event) => {
      // console.log(event);
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      console.log('data when arrived in app: ', data);
      // console.log('dataType in App from server: ', data.type);
      let userNumber = data.numberOfClients;
      // console.log('userNumber:', userNumber);

      if (userNumber) {

        if (userNumber === 1) {

          this.setState({userNumbertoDisplay:userNumber + ' user online'});
          // console.log('userNumbertoDisplay: ', this.state.userNumbertoDisplay);

        } else {

         this.setState({userNumbertoDisplay:userNumber + ' users online'});
          // console.log('userNumbertoDisplay: ', this.state.userNumbertoDisplay);

        }

      } else {

        switch(data.type) {

          case 'incomingMessage':
            console.log('userColor in App case when received: ', data.clientColour);
            this.setState({userColour: data.clientColour});
          // code to handle incoming message
            this.addMessage(data, this.state.userColour);

            // handle incoming message
            break;
          case 'incomingNotification':
            this.setState({userColour: data.clientColour});
            this.addMessage(data, this.state.userColour);
            // handle incoming notification
            break;

          case 'colour':
            this.setState({clientColour: data.colour});
            console.log('this.state.clientColour: ', this.state.clientColour);
            break;

          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
          }
      }
    }

    // this.webSocket.onmessage = (receivedEvent) => {
    //     console.log('receivedeventData: ', receivedEvent.data);
    //     // code to handle incoming message
    //     this.addMessage(JSON.parse(receivedEvent.data));
    //   }
  }

  updateUsername(previousUsername, inputUsername) {

    console.log('this.state in update: ', this.state);

  // Construct a message object containing the data the server needs to process the message from the chat client.
    const message = {
      type: "postNotification",
      content: '**' + previousUsername + '**' + ' changed their name to ' + '**' + inputUsername + '**',
      username: this.state.currentUser.name,
      clientColour:this.state.clientColour
      // userColour: this.state.clientColour

      // clientColour: this.state.clientColour,
    };

    this.setState({ currentUser: {name:inputUsername}});

    // Send the msg object as a JSON-formatted string.
    console.log('message client:', message);
    this.webSocket.send(JSON.stringify(message));
  }

  // Send text to all users through the server
  sendMessage(inputMessage) {

        // console.log('this.state: ', this.state);

  // Construct a message object containing the data the server needs to process the message from the chat client.
    const message = {
      type: "postMessage",
      content: inputMessage,
      username: this.state.currentUser.name,
      clientColour: this.state.clientColour,
    };

    // Send the msg object as a JSON-formatted string.
    console.log('message client:', message);
    this.webSocket.send(JSON.stringify(message));
  }


  addMessage(message, userColour) {

    console.log('message arriving at addMessage: ', message);

    const oldMessageList = this.state.messages;

    const newMessage = {};

    if (message.type === 'incomingMessage' || message.type === 'incomingNotification') {

      newMessage.id = message.id;
      // console.log('message.id:', message.id);
      newMessage.username = message.username;
      newMessage.content = message.content;
      newMessage.type = message.type;
      newMessage.clientColour = userColour;
      // newMessage.userColour = userColour
    }

    const newMessageList = [...oldMessageList, newMessage];
    this.setState({ messages: newMessageList });
  }


  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.state.userNumbertoDisplay}</span>
        </nav>

        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} clientColour={this.state.clientColour} sendMessage={this.sendMessage} updateUsername={this.updateUsername}/>

      </div>
    );
  }
}

export default App;
