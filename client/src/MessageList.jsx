import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {

  render() {

    console.log('Messages in messageList: ', this.props.messages);
    const messageList = this.props.messages.map(message => (
      <Message key={message.id} messageUser={message.username} messageContent={message.content} messageType={message.type}/>
    ));

    return (

      <main className="messages">
        {messageList}
      </main>
    );
  }
}

export default MessageList;