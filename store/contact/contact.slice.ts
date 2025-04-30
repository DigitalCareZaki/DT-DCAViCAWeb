import { createSlice } from '@reduxjs/toolkit';

import initialState from './contact.init';
import { setContacts } from './contact.reducer';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts,
  },
});

export const { setContacts: setContactsSlice } = contactsSlice.actions;

export default contactsSlice.reducer;
