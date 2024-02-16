import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
const commonTextStyle = {
    fontSize: '30px',
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)', 
    color: 'white',
};

const fitStyle = {
    color: 'white',
};

const hubStyle = {
    color: 'blue',
};

const linkStyle = {
    ...commonTextStyle, 
    color: 'blue', // 
};

return (
    <>
    <h4 style={commonTextStyle}>
        Welcome to <span style={fitStyle}>Fit</span><span style={hubStyle}>Hub</span>
    </h4>
    <p style={commonTextStyle}>In order to proceed, please...</p>
    <Link to={'/login'} style={linkStyle}>Login or Register</Link>
    </>
);
};

export default WelcomePage;

