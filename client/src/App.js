import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/users" element={isAuthenticated ? <UserList /> : <Navigate to="/login" />} />
                    <Route path="/users/:id" element={isAuthenticated ? <UserDetails /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
