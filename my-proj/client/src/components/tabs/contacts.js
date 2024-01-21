import React, {useState} from 'react';
import './contacts.css';
import sendToServer from '../functions/Sendtonode.js';
import askServer from '../functions/Sentfromnode.js';


const Contacts =  ({  handleContactClick, handleAddItemClickGroups, contacts, newContact, dropdownItems, setDropdownItems, setNewContact, setContacts, existingGroups }) => {
    

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [retrievedContacts, setRetrievedContacts] = useState({});  
  const handleInputChangeContacts = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };
    const handleAddItemClickContacts2 = async () => {
        if (newContact.name.trim() !== '' && newContact.phone.trim() !== '') {
          const groups = newContact.groups.split(", ");
          var allgroups = false;
          for (let i=0; i < groups.length; i++) {
            if (groups[i]==='All groups') {
                newContact.groups = existingGroups.slice(1).join(", ");

                for (let j=0; j<dropdownItems.length; j++) {
                    dropdownItems[j].names?.push(newContact.name);
                    dropdownItems[j].phones?.push(newContact.phone);
                }
                allgroups = true;
                document.getElementById("element").classList = 'selected';
            }
          }
          if (!allgroups) {

            for (let i = 0; i < groups.length; i++) {
                const givengroup = groups[i];
                
                var index = dropdownItems.findIndex(group => group.group === givengroup);
                if (index !== -1) {
                    // dropdownItems[index]?.names.push(newContact.name);
                    // dropdownItems[index]?.phones.push(newContact.phone);
                    console.log(dropdownItems);
                    setDropdownItems([...dropdownItems]);
                } else {
                    handleAddItemClickGroups(givengroup);
                    index = dropdownItems.findIndex(group => group.group === givengroup);

                    // dropdownItems[index]?.names.push(newContact.name);
                    // dropdownItems[index]?.phones.push(newContact.phone);

                    setDropdownItems([...dropdownItems]);
                }
            }
        }

        setContacts([...contacts, newContact]); //updating contacts that show up in the table
        // const data = await askServer("contacts1");
        // console.log("DATA IS ", data);
        // setRetrievedContacts(data);
        await sendToServer("contacts1", contacts);
          setNewContact({
            name: '',
            phone: '',
            groups: '',
          });
          setSelectedGroups([]); // Reset selected groups after adding a contact
        }
      };
    
    const handleGroupButtonClick = (group) => {
        if (selectedGroups.includes(group)) {
            setSelectedGroups(selectedGroups.filter((selectedGroup) => selectedGroup !== group));
        } else {
            setSelectedGroups([...selectedGroups, group]);
            setNewContact((prevContact) => ({
                ...prevContact,
                groups: prevContact.groups ? `${prevContact.groups}, ${group}` : group,
              }));
        }
    };

    return (
    <div>
      <div className="list-container">
        <ul className="item-list">
        <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone number</th>
              <th>Groups</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => {
            // const item = retrievedContacts[i];

              return (
              <tr
                key={item.id}
                className="sidebar-item"
                onClick={() => handleContactClick(item.id)}
              >
                <td>{item?.name}</td>
                <td>{item?.phone}</td>
                <td>{item?.groups}</td>
              </tr>
              )
    })}
            <tr>
              <td>
                <input
                  className='input'
                  type="text"
                  name="name"
                  value={newContact?.name}
                  onChange={handleInputChangeContacts}
                  placeholder="Enter Name"
                />
              </td>
              <td>
                <input
                  className='input'
                  type="text"
                  name="phone"
                  value={newContact?.phone}
                  onChange={handleInputChangeContacts}
                  placeholder="Enter phone number"
                />
              </td>
              <td>
                <div className="group-buttons">
                    {existingGroups.map((group, index) => (
                    <button
                        key={index}
                        id="element"
                        className={selectedGroups.includes(group) ? 'selected' : ''}
                        onClick={() => handleGroupButtonClick(group)}
                    >
                        {group}
                    </button>
                    ))}
                </div>
                </td>
              <td>
                <button onClick={handleAddItemClickContacts2}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
          
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
