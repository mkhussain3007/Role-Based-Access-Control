import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL
const API_URL = 'http://localhost:5000';

// Async Thunks
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await axios.get(`${API_URL}/roles`);
  return response.data;
});

export const addRole = createAsyncThunk('roles/addRole', async (role) => {
  const response = await axios.post(`${API_URL}/roles`, role);
  return response.data;
});

export const updateRole = createAsyncThunk('roles/updateRole', async (updatedRole) => {
  const response = await axios.put(`${API_URL}/roles/${updatedRole.id}`, updatedRole);
  return response.data;
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (roleId) => {
  await axios.delete(`${API_URL}/roles/${roleId}`);
  return roleId;
});

export const fetchPermissions = createAsyncThunk('roles/fetchPermissions', async () => {
  const response = await axios.get(`${API_URL}/permissions`);
  return response.data;
});

// Role Slice
const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    data: [],
    permissions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Role
      .addCase(addRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Role
      .addCase(updateRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Role
      .addCase(deleteRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((role) => role.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch Permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
