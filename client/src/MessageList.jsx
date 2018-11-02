import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {

  render() {

    console.log('Messages in messageList: ', this.props.messages);
    console.log('this.props.clientColour in MessageList: ', this.props.clientColour);
    const messageList = this.props.messages.map(message => (
      <Message key={message.id} clientColour={message.clientColour} messageUser={message.username} messageContent={message.content} messageType={message.type}/>
    ));

    return (

      <main className="messages">
        {messageList}
      </main>
    );
  }
}

export default MessageList;