import { createSlice } from "@reduxjs/toolkit";
import data from "/src/contacts.json";

const INITIAL_STATE = {
  contacts: data,
};
const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  reducers: {
    addContacts: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContacts: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContacts, deleteContacts } = contactsSlice.actions;
