import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import './UserDetails.css'; 

function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(res.data);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'An error occurred');
                if (err.response && err.response.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
        fetchUser();
    }, [id, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!user) return <div>Loading...</div>;

    return (
        <Container className="mt-5 user-details-container">
            <div className="back-button" onClick={() => navigate('/users')}>
                <FaArrowLeft size={24} />
            </div>
            <Button variant="danger" onClick={handleLogout} className="logout-button">
                Logout
            </Button>
            <Card className="user-details-card mt-3">
                <Row noGutters>
                    <Col md={4} className="text-center">
                        {user.photo ? (
                            <img
                                src={`http://localhost:5000/uploads/${user.photo}`}
                                alt="Profile"
                                className="user-details-image"
                            />
                        ) : (
                            <img
                                src={`${process.env.PUBLIC_URL}/images/image.png`}
                                alt="Profile"
                                className="user-details-image"
                            />
                        )}
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="user-details-title">{user.username}</Card.Title>
                            <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
                            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                            <Card.Text><strong>Age:</strong> {user.age}</Card.Text>
                            <Card.Text><strong>Gender:</strong> {user.gender}</Card.Text>
                            <Card.Text><strong>Phone Number:</strong> {user.phoneNumber}</Card.Text>
                            <Card.Text><strong>Address:</strong> {user.address}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default UserDetails;
