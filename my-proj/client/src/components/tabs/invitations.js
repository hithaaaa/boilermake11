import React, { useState } from 'react';
import './invitations.css'; // Import the CSS file
import EventForm from '../components/eventform.js';
import sendToServer from '../functions/Sendtonode.js';
import sendWhatsappMessage from '../functions/sendwhatsapp.js';


const Invitations = ({existingGroups}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmission = async () => {
    // Implement your logic for handling the selected option here
    console.log('Selected option:', selectedOption);
    await sendWhatsappMessage(selectedOption);
  };



  const handleSubmit = () => {
    const newMessage = {
      title,
      message,
    };

    setSubmittedMessages([...submittedMessages, newMessage]);
    sendToServer("invitations", newMessage);
    // Reset inputs after submission
    setTitle('');
    setMessage('');
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleReadMore = (fullMessage) => {
    alert('Full Message:\n\n' + fullMessage);
  };

  return (
  <div className="message-container">
    <div className="input-section">
        <button className="toggle-form-button" onClick={handleToggleForm}>
        {showForm ? 'Create custom invitation' : 'Generate invitation'}
        </button>
        {showForm && (
        <EventForm />
        )} 
        {!showForm && (
        <div>
            <input
            type="text"
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="invitation-content"
            placeholder="Type your message here..."
            ></textarea>
            <button className="submit-button" onClick={handleSubmit}>
            Submit
            </button>

            <div className="summary-section">
              {submittedMessages.map((submittedMessage, index) => (
                <div key={index} className="submitted-message">
                  <h3>{submittedMessage.title}</h3>
                  <p className="summary-text">
                    {submittedMessage.message.length > 100
                      ? submittedMessage.message.substring(0, 100) + '...'
                      : submittedMessage.message}
                  </p>
                  {submittedMessage.message.length > 100 && (
                    <button
                      className="read-more-button"
                      onClick={() => handleReadMore(submittedMessage.message)}
                    >
                      Read More
                    </button>
                  )}
                </div>
              ))}
              {/* Dropdown and Submit Button */}
              <div className="dropdown-section">
              <select value={selectedOption} onChange={handleDropdownChange}>

              {existingGroups.map((group, index) => (
                    <option key={index} value="option1">{group}</option>
                    ))}
                  </select>


                
                <button className="submit-button" onClick={handleSubmission}>
                  Submit
                </button>
              </div>
            </div>
        </div>
        )}
    </div>

</div>
  );

};
export default Invitations;
