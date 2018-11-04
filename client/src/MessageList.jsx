import React, {Component} from 'react';
import Message from './Message.jsx';

//component which receives the list of messages and maps them to Message component for displaying
class MessageList extends Component {

  render() {
    //mapping messages in the database to send them to the Message component with apropriate props
    const messageList = this.props.messages.map(message => (

      <Message key={message.id} clientColour={message.clientColour} messageUser={message.username}
               messageContent={message.content} messageType={message.type}/>
    ));

    return (
      //displays all the messages, notifications, and images
      <main className="messages">
        {messageList}
      </main>
    );
  }
}

export default MessageList;