import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import api from '../../api'; 
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("google_token");
    navigate("/");
  };
  const handleLogin = async (userDetail) => {
    const {name, email, picture} = userDetail;
    try {
        const response = await  api.post('/user/register',{
            email,
            name,
            picture
        });
        console.log('Logged in successfully', response);
      } catch (error) {
        console.log("Error: ", error);
      }
  };

  const handleSuccess = async(response) => {
    localStorage.setItem("google_token", response.credential);
    var token = response.credential;
    var decoded = jwtDecode(token);
    try{
      const response = await handleLogin(decoded);
      localStorage.setItem('userDetail', JSON.stringify(decoded));
      console.log("Res: ", response)
    }
    catch(err){
      handleLogout();
      console.log("Error: ", err)
    }
    
    navigate("/dashboard");
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login/Register</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => handleError}
        />
      </div>
    </div>
  );
};

export default Login;
