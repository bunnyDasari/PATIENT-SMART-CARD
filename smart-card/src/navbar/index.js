import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const onClickSignUp = () => {
    navigate("/signup");
    setIsMenuOpen(false);
  };

  const onClickAskAi = () => {
    navigate("/askai");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Patient Smart Card</h2>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`navbar-content ${isMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="/fea" onClick={() => setIsMenuOpen(false)}>Features</a></li>
          <li><a href="/dash" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="/con" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>
        <div className="navbar-actions">
          <button className="login-btn" onClick={onClickLogin}>Login</button>
          <button className="signup-btn" onClick={onClickSignUp}>Sign Up</button>
          <button className="signup-btn" onClick={onClickAskAi}>Ask Ai</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
