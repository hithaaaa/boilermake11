import React, { Component, useState } from 'react';
import Sendtonode from '../../functions/Sendtonode.js'
import Clientmessage from '../messages/clientMessage.js'
import Servermessage from '../messages/serverMessage.js'
import './Inputbox.css'
class InputBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', messages: [<Servermessage text="Hi how to help you" />]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  	var { value, messages } = this.state;
  	const newMessage = <Clientmessage text={ value } />
  	this.setState({messages: [...messages, newMessage]})	
  	
    Sendtonode(this.state)
    
    .then((data) => {
    
    var { value, messages } = this.state;
    		
    const responseMessage = <Servermessage text={data.response} />

    this.setState({messages: [...messages, responseMessage]})
    	})
    .catch((error) => {
    	console.log('Error occurred:', error);
    });

    event.preventDefault();
  }

  render() {
  	const { text, messages } = this.state;
    return (
      <>
    	<div class="container">
      <form onSubmit={this.handleSubmit}>
        
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        
        <input type="submit" value="Submit" />
      </form>
      </div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}

      </>
    );
  }
}

export default InputBox;