import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Container, Button, Alert } from 'react-bootstrap';
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUsers(res.data);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'An error occurred');
            }
        };
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Container className="mt-5">
            <div className='det'>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Users</h1>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Table striped bordered hover responsive className="table-custom">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/users/${user._id}`}>
                                        <Button variant="primary" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default UserList;
