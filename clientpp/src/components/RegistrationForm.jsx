import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const RegistrationForm = () => {
    const { register } = useAuth();
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Submit button clicked');

        try {
            // Use formData to access the values
            const {
                firstName,
                lastName,
                gender,
                age,
                height,
                weight,
                email,
                password,
                confirmPassword,
            } = formData;
            const user = {
                firstName,
                lastName,
                gender,
                age,
                height,
                weight,
                email,
                password,
                confirmPassword,
            };
            // Call the register function from the AuthContext
            await register(user);
            console.log('Registration successful');
            navigate('/');
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            // You need to handle errors appropriately; for now, let's log it to the console
            console.error('Registration error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const nextStep = (e) => {
        e.preventDefault();
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return (
                    <div className="mb-3">
                        <h2>Personal Information</h2>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="age"
                                className="form-control"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-dark" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="mb-3">
                        <h2>Physical Information</h2>
                        <div className="mb-3">
                            <select
                                name="gender"
                                className="form-select"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="height"
                                className="form-control"
                                placeholder="Height in cm"
                                value={formData.height}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="weight"
                                className="form-control"
                                placeholder="Weight in kg"
                                value={formData.weight}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-secondary" onClick={prevStep}>
                            Previous
                        </button>
                        <button className="btn btn-dark ms-2" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="mb-3">
                        <h2>Account Information</h2>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-secondary" onClick={prevStep}>
                            Previous
                        </button>
                        <button
                            type="submit"
                            className="btn btn-dark ms-2"
                            onClick={handleRegister}
                        >
                            Submit
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form>
            <div className="form-container text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '20px' }}>
                {renderForm()}
            </div>
        </form>
    );
};

export default RegistrationForm;
