import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";


const WelcomePage = () => {
    

    return(
    <>
    <nav className="d-flex justify-content-end">
    </nav>
    <h4>Welcome to my page</h4>
    <p>In order to proceed, please</p>
    <Link to={'/loginPage'}>Login or Register</Link>
    </>
    )
};

export default WelcomePage;