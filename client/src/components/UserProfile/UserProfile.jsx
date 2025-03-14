import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {
  
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userDetail"));
        if (storedUser) {
        setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("google_token");
        navigate("/");
        setUser(null);
        setOpen(false);
    };

    return (
        <div className={`user-container ${props.className}`}>
        <div className="user-info" onClick={() => setOpen(!open)}>
            {user?.picture ? (
            <img src={user.picture} alt="User Avatar" className="user-avatar" />
            ) : (
            <div className="user-avatar-placeholder">G</div>
            )}
            <span className="user-name">{user?.name || "Guest"}</span>
        </div>

        {open && user && (
            <div className="user-dropdown">
            <div className="dropdown-header">
                <img src={user.picture}  className="dropdown-avatar" />
                <div>
                <p className="dropdown-name">{user.name}</p>
                <p className="dropdown-email">{user.email}</p>
                </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
            </div>
        )}
        </div>
    );
};

export default UserProfile;
