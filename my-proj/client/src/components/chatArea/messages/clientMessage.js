import React from 'react';
import './clientMessage.css'

const Clientmessage = ({text}) => {
	return (
		<div className="my-div">
			<div className="client-msg">
				<p> {text} </p>
			</div>
		</div>
	)
}

export default Clientmessage;