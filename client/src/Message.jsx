import React, {Component} from 'react';

class Message extends Component {



  render() {

    console.log('this.props in Message: ', this.props);
    let messageType = this.props.messageType;
    console.log('messageType in Message: ', messageType);
    let messageItem ='';

    if(messageType === 'incomingMessage') {
      messageItem = (
          <div className="message">
            <span className="message-username">{this.props.messageUser}</span>
            <span className="message-content">{this.props.messageContent}</span>
          </div>
      )
    }

    if (messageType === 'incomingNotification') {

      messageItem = (
            <div class="notification">
              <span class="notification-content">{this.props.messageContent}</span>
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