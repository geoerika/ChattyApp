import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor() {

    super();
    // setting up the state
    this.state = {

      currentUser:{name: 'Bob'},
      messages:[], // messages coming from the server will be stored here as they arrive
      userNumbertoDisplay:'',
      clientColour:'black', // the user name will have clientColour colour
      userColour:'black'  // this is the colour of a message sender
    };

    // method to add new messages arriving from server to the list of messages
    this.addMessage = this.addMessage.bind(this);
    // method to update the current user name in currentUser;
    this.updateUsername = this.updateUsername.bind(this);
    // method to send a message to the server
    this.sendMessage = this.sendMessage.bind(this);
  }


  componentDidMount() {

    setTimeout(() => {

      // simulating an incoming message;
      // add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!', type:'incomingMessage'};
      const messages = this.state.messages.concat(newMessage);
      // update the state of the app component
      // calling setState will trigger a call to render() in App and all child components
      this.setState({messages: messages});
    }, 3000);

    // create a new WebSocket connection.
    this.webSocket = new WebSocket('ws://localhost:3001/');

    // on open connections print a confirmation message in the console; used for testing
    this.webSocket.onopen = () => {
      console.log('Connected to server!');
    };

    // deal with incoming messages from the server
    this.webSocket.onmessage = (event) => {

      // the socket event data is encoded as a JSON string.
      // this line turns it into an object
      const data = JSON.parse(event.data);
      // store the number of connected users received from the server in userName
      let userNumber = data.numberOfClients;

      if (userNumber) {

        if (userNumber === 1) {

          // display "1 user online" in navbar
          this.setState({userNumbertoDisplay:userNumber + ' user online'});

        } else {

          // display "n users online" in navbar
          this.setState({userNumbertoDisplay:userNumber + ' users online'});
        }

      } else {

        switch(data.type) {

          case 'incomingMessage':
            // handle an incoming message, seting the colour of the sender
            // and adding message to the message list
            this.setState({userColour: data.clientColour});
            this.addMessage(data, this.state.userColour);
            break;

          case 'incomingNotification':
            // handle an incoming notfication, seting the colour of the sender
            // and adding the notification on user name change to the message list
            this.setState({userColour: data.clientColour});
            this.addMessage(data, this.state.userColour);
            break;

          case 'image':
            // handle an incoming image, seting the colour of the sender
            // and adding the image url to the message list
            this.setState({userColour: data.clientColour});
            this.addMessage(data, this.state.userColour);
            break;

          case 'colour':
            // handle an initial client colour setting sent by the server at connection
            this.setState({clientColour: data.colour});
            break;

          default:
            // show an error in the console if the message type is unknown
            throw new Error('Unknown event type ' + data.type);
        }
      }
    }
  }

  // method to update the currentUser name when user name changed in chatbar
  updateUsername(previousUsername, inputUsername) {

    // create a message object of notification type with data the server needs in order
    // to process the information sent by the chat client
    const message = {

      type: 'postNotification',
      content: '*' + previousUsername + '*' + ' changed their name to ' + '*' + inputUsername + '*',
      username: this.state.currentUser.name,
      clientColour:this.state.clientColour
    };

    // update the state with a new currentUser name
    this.setState({ currentUser: {name:inputUsername}});

    // send the message object as a JSON-formatted string.
    this.webSocket.send(JSON.stringify(message));
  }


  // method to send a message to all users through the server
  sendMessage(inputMessage) {

  // construct a message object type postMessage containing the data
  // the server needs in order to process the message received from the chat client
    const message = {

      type: 'postMessage',
      content: inputMessage,
      username: this.state.currentUser.name,
      clientColour: this.state.clientColour,
    };

    // send the mesage object as a JSON-formatted string.
    this.webSocket.send(JSON.stringify(message));
  }

  // method which receives a message object and ads it to the message list
  addMessage(message, userColour) {

    const oldMessageList = this.state.messages;

    const newMessage = {};

    if (message.type === 'incomingMessage' || message.type === 'incomingNotification' || 'image') {

      newMessage.id = message.id;
      newMessage.username = message.username;
      newMessage.content = message.content;
      newMessage.type = message.type;
      // set the colour of the clientColour of a particular message to match the one
      // of the user which created it
      newMessage.clientColour = userColour;
    }

    // add the message to the message list
    const newMessageList = [...oldMessageList, newMessage];
    // update the state of the message list
    this.setState({ messages: newMessageList });
  }


  render() {

    return (

      <div>

        {/* create navbar component which includes a logo and a span element for displaying the number of users */}
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.state.userNumbertoDisplay}</span>
        </nav>
        {/* include the MessageList component to display the messages sent and their sender names */}
        <MessageList messages={this.state.messages}/>
        {/* include a Chatbar component with corresponding user names and methods for sending messages to the server and update user names*/}
        <ChatBar currentUser={this.state.currentUser.name} clientColour={this.state.clientColour} sendMessage={this.sendMessage} updateUsername={this.updateUsername}/>

      </div>
    );
  }
}

export default App;
