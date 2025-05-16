import React from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';


const Navbar = () => {
  const navigate = useNavigate()
  const onClickLogin = () => {
    navigate("/login")
  }
  const onClickSignUp = () => {
    navigate("/signup")
  }
  const onClickAskAi = () =>{
    navigate("/askai")
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Patient Smart Card</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/fea">Features</a></li>
        <li><a href="/dash">About</a></li>
        <li><a href="/con">Contact</a></li>
      </ul>
      <div className="navbar-actions">
        <button className="login-btn" onClick={onClickLogin}>Login</button>
        <button className="signup-btn" onClick={onClickSignUp}>Sign Up</button>
        <button className="signup-btn" onClick={onClickAskAi}>Ask Ai</button>

      </div>
    </nav>
  );
};

export default Navbar;
