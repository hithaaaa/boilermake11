import React, {useState} from 'react';
import './sidebar.css'
import Groups from './tabs/groups.js' 
import Contacts from './tabs/contacts.js' 
import Invitations from './tabs/invitations.js'
import LoginButton from './components/login.js'
import Profile from './components/profile.js'
import { useAuth0 } from "@auth0/auth0-react";
import sendToServer from './functions/Sendtonode.js';

const SideBar = () => {
    const {user, isAuthenticated} = useAuth0();
    const items = ['Groups', 'Contacts', 'Invitations'];
    const groups = []

    const [selectedItemSidebar, setSelectedItemSidebar] = useState(items);
    const [selectedItemGroups, setSelectedItemGroups] = useState(items);
    const [dropdownItems, setDropdownItems] = useState(groups);
    const [selectedItemContacts, setSelectedItemContacts] = useState(null);
    const [existingGroups, setExistingGroups] = useState(['All groups']);
    const [newGroup, setNewGroup] = useState({
      group: '',
      names: [],
    });
    
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState('');
    
    
    const handleItemClickSidebar = (index) => {
        setSelectedItemSidebar(index);
    };
    const handleItemClickGroups = (index) => {
        setSelectedItemGroups(index);
    };

    const handleAddItemClickGroups= async (optional_groupname) => {
      if (optional_groupname === "placeholder") {
        if (newGroup !== '') {
          setDropdownItems([...dropdownItems, {'group': newGroup, 'names': []}]);
          setExistingGroups([...existingGroups, newGroup]);
          setNewGroup({});
        }
      } else {
        setDropdownItems([...dropdownItems, {'group': optional_groupname, 'names': []}]);
        setExistingGroups([...existingGroups, optional_groupname]);
      }
      await sendToServer("groups8", dropdownItems);
    };

    const handleContactClick = (index) => {
      setSelectedItemContacts(index);
    };
  
    const handleAddItemClickContacts = () => {
      const newContactTemp = {
        id: contacts.length + 1,
        ...newContact,
      };
  
      setContacts([...contacts, newContactTemp]);
      setNewContact({
        name: '',
        phone: '',
        groups: '',
      });
      sendToServer("contacts", contacts);
    };



    return (
    <div className="parent">
      <div className="sidebar">
        <div className="sidebar-items">
          {items.map((item, index) => (
            <div key={index} className="sidebar-item" onClick={() => handleItemClickSidebar(index)}>
              {item}
            </div>
          ))}
        </div>
        </div>
        <div className="content">
          <div className='content-items'>
            <LoginButton />
            <Profile />
            
                {selectedItemSidebar !== null && (
                items[selectedItemSidebar]==="Groups" && (
                  <Groups handleItemClickGroups={handleItemClickGroups} handleAddItemClickGroups={handleAddItemClickGroups} dropdownItems={dropdownItems} setNewGroup={setNewGroup} />
                  
                  )
                )}
                {selectedItemSidebar !== null && (
                  items[selectedItemSidebar]==="Contacts" && (
                  <Contacts handleContactClick={handleContactClick} handleAddItemClickContacts={handleAddItemClickContacts} handleAddItemClickGroups={handleAddItemClickGroups} dropdownItems={dropdownItems} setDropdownItems={setDropdownItems} contacts={contacts} newContact={newContact} setNewContact={setNewContact} setContacts={setContacts} existingGroups={existingGroups}  />
                  // <></>
                
                  )
                )}
                {selectedItemSidebar !== null && (
                  items[selectedItemSidebar]==="Invitations" && (
                  <Invitations existingGroups={existingGroups}/>
                  // <></>
                  )
                )}
            </div>
        </div>
    </div>
    );
  };

export default SideBar;