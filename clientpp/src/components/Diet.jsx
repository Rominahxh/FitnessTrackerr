import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Diet = ({ id }) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({
        gender: '',
        age: 0,
        height: 0,
        weight: 0,
    });
    const [bmiResult, setBMIResult] = useState(null);
    const [dietInfo, setDietInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/user/${userId}`,
                    { withCredentials: true }
                );
                const userDataFromAPI = response.data;
                setUserData(userDataFromAPI);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const calculateBMI = () => {
            const heightInMeters = userData.height / 100;
            const bmi = userData.weight / (heightInMeters * heightInMeters);
            setBMIResult(bmi);
        };

        calculateBMI();
    }, [userData]);

    useEffect(() => {
        if (bmiResult !== null) {
            if (bmiResult > 25) {
                setDietInfo('Weight Loss Diet');
            } else if (bmiResult < 18.5) {
                setDietInfo('Weight Gain Diet');
            } else {
                setDietInfo('Healthy Diet');
            }
        }
    }, [bmiResult]);

    return (
        <div>
            <Link className="btn btn-outline-primary customColor" to={'/'}>Home</Link>
            {dietInfo !== null && (
                <div>
                    <h2>Your Diet Information:</h2>
                    <p>{dietInfo}</p>
                    {/* You can provide more details based on the specific diet information */}
                </div>
            )}
        </div>
    );
};

export default Diet;
