import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../AuthContext';

const WorkOut = (props) => {
    const [workOuts, setWorkOuts] = useState([]);
    const { logout } = useAuth();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8001/api/workouts", { 
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            // Update the structure of res.data.workOuts to include imageUrl
            setWorkOuts(res.data.workOuts);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate('/login');
            // Redirect or perform any other actions after successful logout
        } catch (error) {
            // Handle logout error
        }
    };

    const handleDeleteWorkOut = (idFromBelow) => {
        axios.delete(`http://localhost:8001/api/workout/${idFromBelow}`)
            .then(response => {
                console.log('success deleting workout');
                console.log(response);

                const filteredWorkouts = workOuts.filter((workout) => {
                    return workout._id !== idFromBelow;
                });
                setWorkOuts(filteredWorkouts);
            })
            .catch((err) => {
                console.log("error deleting workout", err.response);
            });
    };

    const containerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // White with 80% transparency
        color: 'white',
    };

    const buttonStyle = {
        fontSize: '16px',
        padding: '8px 12px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        background: 'black', // Bootstrap btn-dark color
        color: 'gray', // Bootstrap btn-dark text color
        border: '1px solid #343a40', // Bootstrap btn-dark border color
        textDecoration: 'none',
    };

    const headerStyle = {
        fontSize: '40px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        color: 'white',
    };

    const navStyle = {
        background: 'rgba(255, 255, 255, 0.05)', // Transparent black background
        padding: '20px', // Adjust padding as needed
    };

    return (
        <div style={containerStyle}>
            <nav className="d-flex justify-content-between" style={navStyle}>
                <div>
                    <Link className="btn customButton" to={'/createworkout'} style={buttonStyle}>Make your own!</Link>
                </div>
                <h1 style={headerStyle}>WorkOut Routine</h1>
                <div>
                    <Link className="btn customButton" to={'/'} style={buttonStyle}>Home</Link>
                    <button onClick={handleLogout} style={buttonStyle}>Logout</button>
                </div>
            </nav>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {workOuts.map((workOut, index) => (
                    <div key={workOut._id} style={{ flex: '0 0 250px', margin: '10px' }}>
                        <h2>{workOut.title}</h2>
                        <img src={workOut.imageUrl} alt={workOut.title} style={{ width: '250px', height: '150px' }} />
                        <div>
                            <Link className="card-title" to={`/singleworkout/${workOut._id}`} style={buttonStyle}>View</Link>
                            
                            {
                                userId === workOut.userId ?
                                    <Link className="card-title" to={`/editworkout/${workOut._id}`} style={buttonStyle}>Edit</Link>
                                    : null
                            }
                            {
                                userId === workOut.userId ?
                                <button onClick={() => handleDeleteWorkOut(workOut._id)} style={buttonStyle}>Delete</button>
                                    : null
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkOut;

