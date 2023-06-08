// store.js
import Reducer from './Reducer';
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: Reducer,
});

export default store;
