import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const MainPage = (props) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');


    const handleButtonClick = (page) => {
        navigate(page);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Call the logout function from the AuthContext
            await logout();
            navigate('/')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            // Handle registration error
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
            <button onClick={() => handleButtonClick('/workout')}>
                Work Out
            </button>
            <div>
                Text for Page 1
            </div>
            <button onClick={() => handleButtonClick('/exercises')}>
                Exercises
            </button>
            <div>
                Text for Page 2
            </div>
            <button onClick={() => handleButtonClick('/diet')}>
                Diet
            </button>
            <div>
                Text for Page 3
            </div>
            <button onClick={() => handleButtonClick('/BMI')}>
                BMI
            </button>
            <div>
                Text for Page 4
            </div>
        </div>
    );
};

export default MainPage;
