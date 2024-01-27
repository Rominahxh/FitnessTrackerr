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

    return (
        <div>
            <nav className="d-flex justify-content-end">
                <h1>WorkOuts</h1>
                <Link className=" btn btn-outline-primary customColor" to={'/'}>Home</Link>
                <Link className=" btn btn-outline-primary customColor" to={'/createworkout'}>Make your own!</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {workOuts.map((workOut, index) => (
                    <div key={workOut._id} style={{ flex: '0 0 250px', margin: '10px' }}>
                        <h2>{workOut.title}</h2>
                        <img src={workOut.imageUrl} alt={workOut.title} style={{ width: '250px', height: '150px' }} />
                        <div>
                            <button onClick={() => handleDeleteWorkOut(workOut._id)}>Delete</button>
                            {
                                userId == workOut.userId ?
                                <Link className="card-title" to={`/editworkout/${workOut._id}`}>Edit</Link>
                                :
                                null
                            }
                            {
                                userId == workOut.userId ?
                                <Link className="card-title" to={`/singleworkout/${workOut._id}`}>View</Link>
                                :
                                null
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkOut;
