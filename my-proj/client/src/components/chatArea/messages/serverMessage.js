import React from 'react';
import './serverMessage.css'
const Servermessage = ({text}) => {
	return (
		<div className="my-div">
			<div className="server-msg">
			
			<p>{text} </p>
			</div>
		</div>
	)
}

export default Servermessage;