import React, { useState } from 'react';
import './groups.css';
import askServer from '../functions/Sentfromnode.js';

const Groups = ({ handleAddItemClickGroups, dropdownItems }) => {
  const [showForm, setShowForm] = useState(true);
  const [newGroupName, setNewGroupName] = useState('');
  var [retrievedGroups, setRetrievedGroups] = useState({});

  const handleInputChangeGroup = (e) => {
    setNewGroupName(e.target.value);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddGroup = async () => {
    if (newGroupName.trim() !== '') {
      const newGroup = {
        group: newGroupName,
        names: [], // You can initialize it with an empty array or handle it as needed
      };

      // Update the dropdownItems array with the new group
      await handleAddItemClickGroups(newGroupName);

      // Reset the form state
      setNewGroupName('');
    }
    const groups_data = await askServer("groups8");
    
    setRetrievedGroups(groups_data);
  };

  return (
    <>

      

      <div className="grid-container">
        {dropdownItems?.map((item, index) => {
            return (
          <div key={index} className="grid-item">
            <h4>{item.group}</h4>
            {item.names?.map((contact, i) => (
              <option key={i} value={i}>    
                {contact}
              </option>
            ))}

          </div>
            )
})}

        {/* Render a new grid item for the form */}
        {showForm && (
          <div className="grid-item form-grid-item">
            <input
              type="text"
              className='title-input'
              value={newGroupName}
              onChange={handleInputChangeGroup}
              placeholder="Enter group title"
            />
            <button onClick={handleAddGroup}>Add</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Groups;
