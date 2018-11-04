'use strict'
import React, {Component} from 'react';

//component for displaying and receiving new username and receiving a new message content
class ChatBar extends Component {

  //the arrow function gets this.props
  pressedEnterMessage = (evt)=> {

    //on Enter in the message field we store the message in inputMessage
    if (evt.key === 'Enter') {
      const inputMessage = evt.target.value;
      // we send the message content to the sendMessage function defined in App.js
      this.props.sendMessage(inputMessage);
      evt.target.value = "";
    }
  };


  pressedEnterUsername = (evt)=> {

    //on Enter we read the new user name and send it to update the currentUser name in the main App
    if (evt.key === 'Enter') {

      const inputUsername = evt.target.value;
      // we pass on the new username value to the update function defined in app.js
      this.props.updateUsername(this.props.currentUser, inputUsername);
      evt.target.value = "";
    }
  };


  render() {

    return (
      //display of chatbar components, username and input message
      <footer className="chatbar">
        <input className="chatbar-username" name="inputUsername" style={{color: this.props.clientColour}}
                onKeyPress={this.pressedEnterUsername} placeholder={this.props.currentUser}/>
        <input className="chatbar-message" name="inputMessage" onKeyPress={this.pressedEnterMessage}
                placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}

export default ChatBar;