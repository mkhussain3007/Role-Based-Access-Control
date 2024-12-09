import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import roleSlice from './slices/rolesSlice';

export const store = configureStore({
  reducer: {
    users: userSlice,
    roles: roleSlice,
  },
});