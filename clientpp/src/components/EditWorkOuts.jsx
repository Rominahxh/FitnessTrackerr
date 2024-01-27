import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const EditWorkOuts = () => {
    const navigate = useNavigate();
    const [workOut, setWorkOut] = useState({
        title: "",
        description: "",
        imageUrl: "",
        userId: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const { id } = useParams();
    const userId = localStorage.getItem('userId') || null;

    const navigateBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        axios.get(`http://localhost:8001/api/workout/${id}`, {
            withCredentials: true,
        })
        .then((res) => {
            setWorkOut(res.data.workOut);
            console.log('Fetched workout data:', res.data.workOut);
        })
        .catch((err) => {
            console.log("Error fetching workout data:", err);
        });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkOut((prevWorkOut) => ({
            ...prevWorkOut,
            [name]: value,
        }));
    };

    const updateWorkOut = (e) => {
        e.preventDefault();

        if (workOut.title.length < 10 || workOut.description.length < 1 || !userId) {
            setErrorMessage('Your form has some unsolved issues!');
            console.log('Error Message Triggered');
        } else {
            axios.put(`http://localhost:8001/api/workout/${id}`, workOut, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                navigate('/workout');
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    console.log('Validation Error:', err.response.data.error);
                }
                setErrorMessage("API request failed");
                console.log(err);
            });
        }
    };

    return (
        <div className="px-3">
            <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>
            <h1 className="text-center p-2">Edit WorkOut</h1>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

            <form className="w-75 m-auto" onSubmit={(e) => updateWorkOut(e)}>
                <div>
                    <label className="form-label">Title: </label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={workOut.title}
                        onChange={handleInputChange}
                        placeholder="Enter the title"
                    />
                </div>
                <div>
                    <label className="form-label">Description: </label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={workOut.description}
                        onChange={handleInputChange}
                        placeholder="Enter the description"
                    />
                </div>
                <div>
                    <label className="form-label">Image URL: </label>
                    <input
                        className="form-control"
                        type="text"
                        name="imageUrl"
                        value={workOut.imageUrl}
                        onChange={handleInputChange}
                        placeholder="Enter the image URL"
                    />
                </div>
                <button className="btn btn-outline-primary customColor mt-2">Update</button>
            </form>
        </div>
    );
};

export default EditWorkOuts;
