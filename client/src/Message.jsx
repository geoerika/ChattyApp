import React, {Component} from 'react';

class Message extends Component {



  render() {

    console.log('this.props in Message: ', this.props);
    let messageType = this.props.messageType;
    console.log('messageType in Message: ', messageType);
    console.log('this.props.clientColour in Chatbar: ', this.props.clientColour);
    let messageItem ='';

    if(messageType === 'incomingMessage') {
      messageItem = (
          <div className="message">
            <span className="message-username" style={{color: this.props.clientColour}}>{this.props.messageUser}</span>
            <span className="message-content">{this.props.messageContent}</span>
          </div>
      )
    }

    if (messageType === 'incomingNotification') {

      messageItem = (
            <div className="notification">
              <span className="notification-content">{this.props.messageContent}</span>
            </div>
        )
    }

    console.log('messageItem: ', messageItem);

    return (
      <div>
        {messageItem}
      </div>
    );
  }
}

export default Message;