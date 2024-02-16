import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from the AuthContext
            await login(email, password);
            navigate('/');
            // Redirect or perform any other actions after successful login
        } catch (error) {
            // Handle login error
        }
    };

    return (
        <div className="container mt-5 p-4">
            <div className="card mx-auto" style={{ maxWidth: '400px', background: 'rgba(0, 0, 0, 0.7)' }}>
                <div className="card-header bg-transparent text-white">
                    <h1 className="text-center">
                        <span style={{ color: '#fff' }}>Fit</span>
                        <span style={{ color: '#007bff' }}>hub</span>
                    </h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <h2 className="text-center text-white">Log in to your account</h2>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#fff', margin: '10px 0' }}
                            />
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        color: '#fff',
                                        borderTopRightRadius: showPassword ? '0' : '0.25rem',
                                        borderBottomRightRadius: showPassword ? '0' : '0.25rem',
                                        border: '1px solid #ced4da', // Adjust the color as needed
                                    }}
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            border: '1px solid #ced4da', // Adjust the color as needed
                                        }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3" style={{ backgroundColor: '#333', color: '#fff' }}>
                            Login
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        <p className='white'>Don't have an account?</p>
                        <Link to="/registration" style={{ color: 'blue' }}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
