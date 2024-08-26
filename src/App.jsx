import { useEffect, useState } from "react";
import "./App.css";
import data from "./contacts.json";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import { nanoid } from "nanoid";
import SearchBox from "./components/SearchBox/SearchBox";

function App() {
  const [contacts, setContacts] = useState(() => {
    const json = window.localStorage.getItem("contacts");
    const savedContacts = JSON.parse(json);
    console.log(savedContacts);
    if (savedContacts !== null) {
      return savedContacts;
    }
    return data;
  });
  console.log(contacts);
  const [filter, setFilter] = useState("");

  const addContact = (newContact) => {
    const finalContact = { ...newContact, id: nanoid() };
    console.log(finalContact);
    setContacts((prevContacts) => {
      return [...prevContacts, finalContact];
    });
  };
  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };
  const wantedContact = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  return (
    <>
      <h1 className="pageHeader">Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={wantedContact} onDelete={deleteContact} />
    </>
  );
}

export default App;
