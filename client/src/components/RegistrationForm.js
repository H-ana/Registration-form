import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import './RegistrationForm.css';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        age: '',
        gender: 'male', 
        phoneNumber: '',
        address: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const { username, email, password, name, age, gender, phoneNumber, address } = formData;
        const newErrors = {};

        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) {
            newErrors.password = 'Password is required';
        } else {
            if (password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
            if (!/[A-Z]/.test(password)) newErrors.password = 'Password must contain at least one uppercase letter';
            if (!/[a-z]/.test(password)) newErrors.password = 'Password must contain at least one lowercase letter';
            if (!/[0-9]/.test(password)) newErrors.password = 'Password must contain at least one number';
            if (!/[!@#$%^&*]/.test(password)) newErrors.password = 'Password must contain at least one special character';
            if (/\s/.test(password)) newErrors.password = 'Password must not contain spaces';
        }
        if (!name) newErrors.name = 'Name is required';
        if (!age) newErrors.age = 'Age is required';
        if (!gender) newErrors.gender = 'Gender is required';
        if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!address) newErrors.address = 'Address is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/register', formData);
            console.log('Registration response:', res.data);
            if (res.data) {
                navigate('/users');
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data && err.response.data.error) {
                setErrors({ form: err.response.data.error });
            } else if (err.message) {
                setErrors({ form: err.message });
            } else {
                setErrors({ form: 'An unexpected error occurred' });
            }
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow-sm">
                <h1 className="text-center mb-4">Registration</h1>
                {errors.form && <Alert variant="danger">{errors.form}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <Alert variant="danger">{errors.name}</Alert>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <Alert variant="danger">{errors.username}</Alert>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            {errors.phoneNumber && <Alert variant="danger">{errors.phoneNumber}</Alert>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {errors.address && <Alert variant="danger">{errors.address}</Alert>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            {errors.age && <Alert variant="danger">{errors.age}</Alert>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                            {errors.gender && <Alert variant="danger">{errors.gender}</Alert>}
                        </Form.Group>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default RegistrationForm;
