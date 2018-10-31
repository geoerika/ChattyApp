import React, {Component} from 'react';

class ChatBar extends Component {

  //the arrow function gets this.props
  pressedEnterMessage = (evt)=> {

    if (evt.key === 'Enter') {
      const inputMessage = evt.target.value;
      console.log('inputMessage: ', inputMessage);

    // we call the update function defined in app.js
      this.props.sendMessage(inputMessage);

      evt.target.value = "";
    }
  };

  pressedEnterUsername = (evt)=> {

    if (evt.key === 'Enter') {
      const inputUsername = evt.target.value;
      console.log('inputUsername: ', inputUsername);

    // we call the update function defined in app.js
      this.props.updateUsername(inputUsername);

      evt.target.value = "";
    }
  };

  render() {

    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.pressedEnterUsername} name="inputUsername" placeholder={this.props.currentUser}/>
        <input className="chatbar-message" onKeyPress={this.pressedEnterMessage} name="inputMessage" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}



export default ChatBar;