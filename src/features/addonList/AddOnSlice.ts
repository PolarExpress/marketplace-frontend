// Redux slice to manage add-on-related state (fetched items, loading status, search filters, etc.).

import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const AddOnSlice = createSlice({
    name: 'addons',
    initialState,
    reducers: {}
  });

export default AddOnSlice;