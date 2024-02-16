import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const SingleWorkOut = () => {
    const navigate = useNavigate();
    const [workOut, setWorkOut] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8001/api/workout/${id}`, {
            withCredentials: true,
        })
        .then((res) => {
            setWorkOut(res.data.workOut);
        })
        .catch((err) => {
            console.log("Error fetching workout data:", err);
        });
    }, [id]);

    const navigateBack = () => {
        navigate(-1);
    };

    // Split description into an array of items based on newline character
    const descriptionItems = workOut.description.split('\n').map((item, index) => (
        <li key={index} className="text-black">{item}</li>
    ));

    return (
        <div className="px-3 bg-white bg-opacity-75 rounded p-4">
            <p className="text-decoration-none text-black" onClick={navigateBack}> &larr; Back</p>
            <h1 className="text-center p-2 text-black">{workOut.title}</h1>
            <div className="mb-3">
                <img src={workOut.imageUrl} alt={workOut.title} style={{ width: '400px', maxHeight: '200px', objectFit: 'cover' }} />
            </div>
            <ul>{descriptionItems}</ul>
        </div>
    );
};

export default SingleWorkOut;
