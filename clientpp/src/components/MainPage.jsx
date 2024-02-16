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
            navigate('/');
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            // Handle registration error
        }
    };

    const textDivStyle = {
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '10px',
        color: '#fff',
        width: '210px',
        height: '350px', // Set a fixed height for the text divs
    };

    return (
        <div>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', color: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <h1>Elevate Your Fitness, Empower Your Life </h1>
                <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                    <button style={{ marginRight: '10px' }} onClick={() => handleButtonClick('/profile')}>
                        My Profile
                    </button>
                    <button onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </nav>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                    <button style={{ padding: '20px', margin: '5px', width: '200px' }} onClick={() => handleButtonClick('/workout')}>
                        Work Out
                    </button>
                    <div style={textDivStyle}>
                    Supercharge your day by sharing your daily fitness routine with us! Boost organization and clarity while inspiring others on their wellness journey. Your detailed insights matter—let's make fitness a shared experience!
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button style={{ padding: '20px', margin: '5px', width: '200px' }} onClick={() => handleButtonClick('/exercises')}>
                        Exercises
                    </button>
                    <div style={textDivStyle}>
                    Experience videos demonstration featuring a variety of exercises designed to enhance your workout. Elevate your fitness routine with expert guidance to help you achieve better results!
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button style={{ padding: '20px', margin: '5px', width: '200px' }} onClick={() => handleButtonClick('/diet')}>
                        Diet
                    </button>
                    <div style={textDivStyle}>
                    Explore our diverse range of diets tailored to your BMI and gender, crafted to support you in achieving a healthier and more fulfilling life!
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button style={{ padding: '20px', margin: '5px', width: '200px' }} onClick={() => handleButtonClick('/BMI')}>
                        BMI
                    </button>
                    <div style={textDivStyle}>
                    Unlock personalized BMI results to gauge whether you're on a great path or need adjustments for a healthier you!
                    </div>
                </div>
            </div>
            <div>
                {/* Content for each section */}
            </div>
        </div>
    );
};

export default MainPage;
