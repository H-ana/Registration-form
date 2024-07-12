import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Container,Button } from 'react-bootstrap';
import './UserList.css'; 

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:5000/users');
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    return (
        <Container className="mt-5">
            <div className='det'>
            <div>
            <h1>Users</h1>
            </div>
            <div>
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
            </div>
        </Container>
    );
}

export default UserList;
