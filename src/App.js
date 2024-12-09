import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import UserList from './components/UserManagement/UserList';
import RoleList from './components/RoleManagement/RoleList';
import PermissionsMatrix from './components/Permissions/PermissionMatrix';
import Login from './components/Login/Login';
import { AuthProvider} from './components/Login/AuthContext';
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/roles" element={<RoleList />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;