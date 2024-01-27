import React, {useState, useEffect} from 'react';
import Login from '../components/LogIn';
import RegistrationForm from '../components/RegistrationForm';

function LoginPage() {

return (
<>
    <div className="d-flex justify-content-betweem">
        <Login/>
        <RegistrationForm/>
    </div>
</>
)
}

export default LoginPage
