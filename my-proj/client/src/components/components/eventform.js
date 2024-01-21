import React, { useState } from 'react';
import './eventform.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    rsvpRequired: 'no',
    zoomLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData);
    // Add logic to store jsonData (e.g., send it to a server, save it in local storage, etc.)
  };

  return (
    <div className="event-form-container">
      <h2>Event Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name of Event:
          <input
            type="text"
            className='input-text'
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          When is the Event:
          <input
            className='input-text'
            type="text"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Where is the Event:
          <input
            className='input-text'
            type="text"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          RSVP Required?
          <select
            name="rsvpRequired"
            value={formData.rsvpRequired}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>
          Zoom Link:
          <input
            type="text"
            className='input-text'
            name="zoomLink"
            value={formData.zoomLink}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventForm;
