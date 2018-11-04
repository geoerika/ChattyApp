import React, {Component} from 'react';

//component which handles various type of messages and displays them accordingly
class Message extends Component {

  render() {

    let messageType = this.props.messageType;
    let messageItem ='';

    //case for incoming message
    if(messageType === 'incomingMessage') {

      messageItem = (

        <div className="message">
          <span className="message-username" style={{color: this.props.clientColour}}>{this.props.messageUser}</span>
          <span className="message-content">{this.props.messageContent}</span>
        </div>
      )
    }

    //case for incoming notification
    if (messageType === 'incomingNotification') {

      messageItem = (

        <div className="notification">
          <span className="notification-content">{this.props.messageContent}</span>
        </div>
      )
    }

    //case for incoming message
    if (messageType === 'image') {

      messageItem = (

        <div className="image">
          <span className="message-username" style={{color: this.props.clientColour}}>{this.props.messageUser}</span>
          <div>
            <img className="message-image" src={this.props.messageContent} width={'20%'}/>
          </div>
        </div>
      )
    }

    return (
      // display the message
      <div>
        {messageItem}
      </div>
    );
  }
}

export default Message;