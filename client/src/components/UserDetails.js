import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import './UserDetails.css'; 

function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/users/${id}`);
            setUser(res.data);
        };
        fetchUser();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <Container className="mt-5 user-details-container">
            <div className="back-button" onClick={() => navigate('/users')}>
                <FaArrowLeft size={24} />
            </div>
            <Card className="user-details-card mt-3">
                <Row noGutters>
                    <Col md={4} className="text-center">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/image.png`}
                            alt="Profile"
                            className="user-details-image"
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="user-details-title">{user.username}</Card.Title>
                            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                            <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
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
