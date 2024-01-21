import React from 'react';
import ChatScreen from './chatScreen/Chatscreen.js'
import './chatScreen/Chatscreen.css'
import InputBox from './inputBox/InputBox.js'
import './inputBox/Inputbox.css'

const ChatArea = () => {
	return (
		<>
		<ChatScreen />
		<InputBox />
		</>
	)
}

export default ChatArea;