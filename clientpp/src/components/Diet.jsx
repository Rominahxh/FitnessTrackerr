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
        <div className="px-3 bg-white bg-opacity-75 rounded p-4">
        <Link className="btn btn-dark customColor" to={'/'}>Home</Link>
        {dietInfo !== null && (
            <div className="mt-3">
                <h2 className="text-black">Your Diet based on your BMI:</h2>
                <p className="text-black">{dietInfo}</p>
                {dietInfo === 'Weight Loss Diet' && (
                    <p className="text-black">Additional information about weight loss diet...</p>
                )}
                {dietInfo === 'Weight Gain Diet' && (
                    <p className="text-black">Additional information about weight gain diet...</p>
                )}
                {dietInfo === 'Healthy Diet' && (
                    <div className="text-black">
                        <div>
                            <p className="small-font">Day 1:
                                <br /> Breakfast: Greek yogurt with berries and a sprinkle of chia seeds.
                                <br /> Lunch: Grilled chicken breast with quinoa and roasted vegetables.
                                <br /> Dinner: Baked salmon with sweet potato and steamed broccoli.
                            </p>
                        </div>
                        <div>
                            <p className="small-font">Day 2:
                                <br /> Breakfast: Oatmeal with sliced banana and a drizzle of honey.
                                <br /> Lunch: Lentil and vegetable soup with a side of whole-grain bread.
                                <br /> Dinner: Stir-fried tofu with brown rice and assorted stir-fried vegetables.
                            </p>
                        </div>
                        <div>
                            <p className="small-font">Day 3:
                                <br /> Breakfast: Whole-grain toast with avocado and poached eggs.
                                <br /> Lunch: Quinoa salad with chickpeas, cucumber, cherry tomatoes, and feta cheese.
                                <br /> Dinner: Grilled shrimp with quinoa and roasted asparagus.
                            </p>
                        </div>
                        <div>
                            <p className="small-font">Day 4:
                                <br /> Breakfast: Smoothie with spinach, banana, berries, and almond milk.
                                <br /> Lunch: Turkey and vegetable wrap with whole-grain tortilla.
                                <br /> Dinner: Baked chicken thighs with sweet potato wedges and green beans.
                            </p>
                        </div>
                        <div>
                            <p className="small-font">Day 5:
                                <br /> Breakfast: Whole-grain pancakes with fresh strawberries and a dollop of Greek yogurt.
                                <br /> Lunch: Quinoa bowl with black beans, corn, avocado, and salsa.
                                <br /> Dinner: Grilled fish tacos with cabbage slaw and a side of brown rice.
                            </p>
                        </div>
                        <div>
                            <p className="small-font">Day 6:
                                <br /> Breakfast: Scrambled eggs with spinach and whole-grain toast.
                                <br /> Lunch: Spinach and kale salad with grilled chicken, cherry tomatoes, and balsamic vinaigrette.
                                <br /> Dinner: Baked cod with quinoa and roasted Brussels sprouts.
                            </p>
                        </div>
                        <div>
                            <p className="small-font">Day 7:
                                <br /> Breakfast: Overnight oats with almond milk, chia seeds, and mixed berries.
                                <br /> Lunch: Whole-grain pasta with tomato sauce, vegetables, and grilled chicken.
                                <br /> Dinner: Stir-fried beef with broccoli and brown rice.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
    );
};

export default Diet;
