import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Profile = () => {
    const { updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                const response = await axios.get(`http://localhost:8001/api/user/${userId}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userDataFromAPI = response.data;

                // Update the form data with the fetched user data
                setFormData({
                    firstName: userDataFromAPI.firstName || '',
                    lastName: userDataFromAPI.lastName || '',
                    gender: userDataFromAPI.gender || '',
                    age: userDataFromAPI.age || '',
                    height: userDataFromAPI.height || '',
                    weight: userDataFromAPI.weight || '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Update user profile when form data changes
    useEffect(() => {
        const updateProfileOnFormChange = async () => {
            try {
                // Use formData to access the values
                const { firstName, lastName, gender, age, height, weight } = formData;
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                // Use axios.put to update the user profile on the server
                await axios.put(
                    `http://localhost:8001/api/user/${userId}`,
                    {
                        firstName,
                        lastName,
                        gender,
                        age,
                        height,
                        weight,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Call the updateUserProfile function from the AuthContext
                await updateUserProfile({
                    firstName,
                    lastName,
                    gender,
                    age,
                    height,
                    weight,
                });

                console.log('Profile update successful');
                
                // Navigate back to the home page after a successful profile update
                navigate('/');
            } catch (error) {
                // Handle errors appropriately; for now, log it to the console
                console.error('Profile update error:', error);
            }
        };

        // Trigger updateProfileOnFormChange whenever formData changes
        updateProfileOnFormChange();
    }, [formData, updateUserProfile, navigate]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log('Update Profile button clicked');
        // The actual update logic is handled by the useEffect listening to formData changes
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleNavigateBack = () => {
        navigate('/'); // Specify the path to which you want to navigate
    };

    return (
        <form>
            <div className="form-container text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '20px' }}>
                <h2>Profile Information</h2>
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
                <div className='buttons'>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        onClick={handleUpdateProfile}
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        className="btn btn-dark mt-2"
                        onClick={handleNavigateBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Profile;
