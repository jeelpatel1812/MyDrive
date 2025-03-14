import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/button";
import UserProfile from "../UserProfile/UserProfile";

const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem("google_token");
        navigate("/");
    };
    
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1 className="logo">My Drive</h1>
            <UserProfile className="logoutButton" />
        {/* <Button className="logoutButton" onClick={handleLogout}>Logout</Button> */}
        </header>
    );
};

export default Header;
