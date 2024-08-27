import { useEffect } from "react";
import "./App.css";

import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import { nanoid } from "nanoid";
import SearchBox from "./components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, deleteContacts } from "./redux/contacts/contactsSlice";
import { setFilterValue } from "./redux/filter/filterSlice";
function App() {
  // const [contacts, setContacts] = useState(() => {
  //   const json = window.localStorage.getItem("contacts");
  //   const savedContacts = JSON.parse(json);
  //   console.log(savedContacts);
  //   if (savedContacts !== null) {
  //     return savedContacts;
  //   }
  //   return data;
  // });
  const contacts = useSelector((state) => state.contacts.contacts);

  const filterValue = useSelector((state) => state.filter.filterValue);

  const dispatch = useDispatch();

  const handleAddingContact = (newContact) => {
    const finalContact = { ...newContact, id: nanoid() };
    const action = addContacts(finalContact);
    dispatch(action);
  };

  const handleDeleteContact = (contactId) => {
    const action = deleteContacts(contactId);
    dispatch(action);
  };
  const handleFilter = (value) => {
    console.log(value);
    const action = setFilterValue(value);
    dispatch(action);
  };
  const wantedContact = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterValue.toLocaleLowerCase())
  );
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  return (
    <>
      <h1 className="pageHeader">Phonebook</h1>
      <ContactForm onAdd={handleAddingContact} />
      <SearchBox value={filterValue} onFilter={handleFilter} />
      <ContactList contacts={wantedContact} onDelete={handleDeleteContact} />
    </>
  );
}

export default App;
