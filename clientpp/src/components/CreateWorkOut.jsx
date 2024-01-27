import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../AuthContext';

const CreateWorkOut = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // Changed for image URL
    const [errorMessage, setErrorMessage] = useState("");
    
    const userId = localStorage.getItem('userId') || null;

    const navigateBack = () => {
        navigate(-1);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const createWorkOut = (e) => {
        e.preventDefault();

        if (title.length < 10 || description.length < 1 || !userId) {
            setErrorMessage('Your form has some unsolved issues!');
            console.log('Error Message Triggered');
        } else {
            axios.post('http://localhost:8001/api/workout',
                {
                    title,
                    description,
                    userId,
                    imageUrl, // Updated for image URL
                },
                {
                    withCredentials: true
                })
                .then(res => {
                    console.log(res);
                    navigate('/');
                })
                .catch(err => {
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
            <h1 className="text-center p-2">Create WorkOut</h1>
            {
                errorMessage ?
                    <p className="text-danger text-center">{errorMessage}</p> :
                    null
            }

            <form className="w-75 m-auto" onSubmit={(e) => createWorkOut(e)}>
                <div>
                    <label className="form-label">Title: </label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                    />
                </div>
                {title.length > 0 && title.length < 3 ?
                    <p className="text-danger">The title should be 3 characters or more</p> :
                    null
                }

                <div>
                    <label className="form-label">Description: </label>
                    <textarea
                        className="form-control"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the description"
                    />
                </div>
                {description.length < 1 ?
                    <p className="text-danger">The description is required</p> :
                    null
                }

                <div>
                    <label className="form-label">Image URL: </label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        placeholder="Enter the image URL"
                    />
                </div>

                <button className="btn btn-outline-primary customColor mt-2">Create</button>
            </form>
        </div>
    );
};

export default CreateWorkOut;
