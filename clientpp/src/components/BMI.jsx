import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';

const BMI = ({ id }) => {
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');
const [userData, setUserData] = useState({
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
});
const [bmiResult, setBMIResult] = useState(null);

useEffect(() => {
    const fetchUserData = async () => {
    try {
        const response = await axios.get(`http://localhost:8001/api/user/${userId}`,
        {withCredentials: true}
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

  // Define BMI ranges and corresponding colors
const bmiRanges = [
    { range: { min: 0, max: 18.5 }, color: '#FFFF00', label: 'Underweight' },
    { range: { min: 18.5, max: 24.9 }, color: '#00FF00', label: 'Healthy Weight' },
    { range: { min: 25.0, max: 29.9 }, color: '#FFA500', label: 'Overweight' },
    { range: { min: 30.0, max: 40}, color: '#FF0000', label: 'Obese' },
];  

const getRangeColor = (value) => {
    const range = bmiRanges.find((r) => value >= r.range.min && value <= r.range.max);
    return range ? range.color : '#000000';
};

const chartData = bmiRanges.map((range, index) => ({
    value: range.range.max - range.range.min,
    key: index + 1,
    color: range.color,
}));

const arrowPosition =
    bmiResult !== null
    ? (bmiResult - bmiRanges[0].range.min) /
        (bmiRanges[bmiRanges.length - 1].range.max - bmiRanges[0].range.min) *
        100
      : 50; // Default position to the middle if bmiResult is null

return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left side (BMI Result) */}
            <div>
                <Link className="btn btn-dark customColor" to={'/'}>
                    Home
                </Link>
                {bmiResult !== null && (
                    <div>
                        <h2 className='white'>Your BMI Result:</h2>
                        <p className='white'>{`BMI: ${bmiResult.toFixed(2)}`}</p>
                        {chartData.some(data => isNaN(data.value)) ? (
                            <p>Unable to display chart. Please check your input data.</p>
                        ) : (
                            <PieChart
                                data={chartData}
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                cx={50}
                                cy={50}
                                lineWidth={15}
                                startAngle={-90}
                                totalValue={30}
                            />
                        )}
                        <div
                            style={{
                                position: 'relative',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                fontSize: '18px',
                            }}
                        >
                            <span style={{ color: getRangeColor(bmiResult), fontWeight: 'bold' }}>
                                {bmiRanges.find((r) => bmiResult >= r.range.min && bmiResult <= r.range.max)?.label}
                            </span>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '88%',
                                    left: `calc(${arrowPosition}% - 5px)`,
                                    width: '10px',
                                    height: '10px',
                                    background: '#000',
                                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Right side (Text in transparent black div) */}
            <div style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '20px', color: 'white', width: '350px' }}>
                <p>
                    BMI stands for Body Mass Index. It is a measure that relates a person's weight to their height.
                    BMI is commonly used as a screening tool to categorize individuals into different weight status
                    categories, such as underweight, normal weight, overweight, and obesity.
                </p>
                <p>
                    BMI is a quick and easy way to assess whether a person has a healthy body weight in relation to
                    their height.
                </p>
                <p>
                    BMI categories are generally defined by the World Health Organization (WHO) and are as follows:
                </p>
                <ul>
                    <li>Underweight: BMI less than 18.5</li>
                    <li>Normal weight: BMI between 18.5 and 24.9</li>
                    <li>Overweight: BMI between 25 and 29.9</li>
                    <li>Obesity: BMI 30 or greater</li>
                </ul>
            </div>
        </div>
);
};

export default BMI;

