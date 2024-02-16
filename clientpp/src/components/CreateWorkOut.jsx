import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../AuthContext';

const CreateWorkOut = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
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

        if (title.length < 3 || description.length < 1 || !userId) {
            setErrorMessage('Your form has some unsolved issues!');
            console.log('Error Message Triggered');
        } else {
            axios.post('http://localhost:8001/api/workout',
                {
                    title,
                    description,
                    userId,
                    imageUrl,
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
        <div className="px-3 bg-white bg-opacity-75 rounded p-4">
            <p className="text-decoration-none text-black" onClick={navigateBack}> &larr; </p>
            <h1 className="text-center p-2 text-black">Create WorkOut</h1>
            {
                errorMessage ?
                    <p className="text-danger text-center text-black">{errorMessage}</p> :
                    null
            }

            <form className="w-75 m-auto" onSubmit={(e) => createWorkOut(e)}>
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                    />
                    {title.length > 0 && title.length < 3 ?
                        <p className="text-danger text-black">The title should be 3 characters or more</p> :
                        null
                    }
                </div>

                <div className="mb-3">
                    <textarea
                        className="form-control h-100"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the description"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-black">Image URL: </label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        placeholder="Enter the image URL"
                        className="form-control"
                    />
                </div>

                <button className="btn btn-dark customColor mt-2">Create</button>
            </form>
        </div>
    );
};

export default CreateWorkOut;
