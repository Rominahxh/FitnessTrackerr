import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from the AuthContext
            await login(email, password);
            navigate('/')
            // Redirect or perform any other actions after successful login
        } catch (error) {
            // Handle login error
        }
    };

    return (
        <div className=''>
        <h1>Fithub</h1>
        <div className='transparent-background'>
            <form onSubmit={handleLogin}>
                <h1>Welcome</h1>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/registration">Register here</Link>
        </div>
        </div>
    );
};

export default Login;
