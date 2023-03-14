import React from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { useEffect, useState } from 'react';

export const App = () => {
  let [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  let [filter, setFilter] = useState('');

  useEffect(() => {
    let contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts((contacts = parsedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    let isNameUnique = false;
    isNameUnique = contacts.some(elem => elem.name === name);
    if (!isNameUnique) {
      setContacts([...contacts, { id: nanoid(), name: name, number: number }]);
    } else {
      alert('This contact already exist');
    }
  };

  const handleRemoveContact = id => {
    const prevContacts = contacts;
    setContacts(prevContacts.filter(elem => elem.id !== id));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const FilterChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const visibleContacts = getFilteredContacts();
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit}></ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={FilterChange}></Filter>
      <ContactList
        contacts={visibleContacts}
        onRemoveContact={handleRemoveContact}
      />
    </div>
  );
};
