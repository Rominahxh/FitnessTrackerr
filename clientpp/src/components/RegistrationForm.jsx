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
        confirmPassword: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();

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
                confirmPassword
            } = formData;
            const user = { firstName,
                lastName,
                gender,
                age,
                height,
                weight,
                email,
                password,
                confirmPassword}
            // Call the register function from the AuthContext
            await register(
            user
            );
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
        e.preventDefault()
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2>Step 1: Personal Information</h2>
                        <div>
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Age:</label>
                            <input type="text" name="age" value={formData.age} onChange={handleChange} />
                        </div>
                        <button onClick={nextStep}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2>Step 2: Physical Information</h2>
                        <div>
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label>Height:</label>
                            <input type="text" name="height" placeholder="cm" value={formData.height} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Weight:</label>
                            <input type="text" name="weight" placeholder="kg" value={formData.weight} onChange={handleChange} />
                        </div>
                        <button onClick={prevStep}>Previous</button>
                        <button onClick={nextStep}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Step 3: Account Information</h2>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <button onClick={prevStep}>Previous</button>
                        {/* <button type="submit">Submit</button> */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form >
            <div className="form-container">
                {renderForm()}
            </div>
            {step === 3 && <button type="submit" onClick={handleRegister}>Submit</button>}
        </form>
    );
};

export default RegistrationForm;
