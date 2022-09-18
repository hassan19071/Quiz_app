import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './getData';

export default configureStore({
  reducer: {
    data: counterReducer,
  },
})