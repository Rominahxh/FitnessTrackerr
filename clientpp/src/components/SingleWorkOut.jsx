import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

    return (
        <div className="px-3">
            <p className="text-decoration-none" onClick={navigateBack}> &larr; Back</p>
            <h1 className="text-center p-2">{workOut.title}</h1>
            <div>
                <img src={workOut.imageUrl} alt={workOut.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            </div>
            <p className="mt-3">{workOut.description}</p>
        </div>
    );
};

export default SingleWorkOut;
