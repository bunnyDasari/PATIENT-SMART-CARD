import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import './index.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAboutClick = () => {
    if (window.location.pathname === '/') {
      const section = document.getElementById('why-smart-health-card');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('why-smart-health-card');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/fea' },
    { name: 'Contact', path: '/con' }
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
        >
          <span className="logo-icon">🏥</span>
          <span className="logo-text">Smart Health Card</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              className="nav-link"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={
                link.name === 'About'
                  ? handleAboutClick
                  : () => navigate(link.path)
              }
            >
              {link.name}
            </motion.div>
          ))}
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <motion.button
              className="logout-button"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <>
              <motion.button
                className="login-button"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                className="signup-button"
                onClick={() => navigate('/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                className="mobile-nav-link"
                onClick={() => {
                  if (link.name === 'About') {
                    handleAboutClick();
                    setIsMobileMenuOpen(false);
                  } else {
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }
                }}
                whileHover={{ x: 10 }}
                whileTap={{ x: 0 }}
              >
                {link.name}
              </motion.div>
            ))}
            {isLoggedIn ? (
              <motion.button
                className="mobile-logout-button"
                onClick={handleLogout}
                whileHover={{ x: 10 }}
                whileTap={{ x: 0 }}
              >
                Logout
              </motion.button>
            ) : (
              <>
                <motion.button
                  className="mobile-login-button"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 0 }}
                >
                  Login
                </motion.button>
                <motion.button
                  className="mobile-signup-button"
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 0 }}
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;