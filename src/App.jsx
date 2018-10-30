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

const currentUser = {name: "Bob"};// optional. if currentUser is not defined, it means the user is Anonymous
const messages = [
    {
      id: '1',
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: '2',
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ];
// }


class App extends Component {

  constructor() {
    super();
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser:currentUser.name,
      messages:messages
    };
    console.log('currentUser: ', this.state.currentUser);
    console.log('messages', this.state.messages);
  }




  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}/>

      </div>
    );
  }
}
export default App;
