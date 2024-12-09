import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await axios.post('http://localhost:5000/users', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await axios.put(`http://localhost:5000/users/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`http://localhost:5000/users/${userId}`);
  return userId; // return the userId to delete it from the store
});

const userSlice = createSlice({
  name: 'users',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.data.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update user data in the state
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
