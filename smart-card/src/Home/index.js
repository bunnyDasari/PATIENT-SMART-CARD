import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';
import Navbar from '../navbar';

const Home = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <>

            <div className="home-wrapper">
                <Navbar />
                <div className="home-container">
                    {/* Hero Section */}
                    <section className="hero-section">
                        <motion.div
                            className="hero-content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1>Smart Health Card</h1>
                            <p className="hero-subtitle">Your Digital Health Companion</p>
                            <motion.button
                                className="cta-button"
                                onClick={handleGetStarted}
                                whileHover={{ scale: 1.05, backgroundColor: '#2a2a2a' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started
                            </motion.button>
                        </motion.div>
                    </section>

                    {/* Features Section */}
                    <section className="features-section" id="why-smart-health-card">
                        <h2>Why Choose Smart Health Card?</h2>
                        <div className="features-grid">
                            <motion.div
                                className="feature-card"
                                whileHover={{ y: -10, backgroundColor: '#1a1a1a' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">🏥</div>
                                <h3>Digital Health Records</h3>
                                <p>Access your complete medical history anytime, anywhere</p>
                            </motion.div>

                            <motion.div
                                className="feature-card"
                                whileHover={{ y: -10, backgroundColor: '#1a1a1a' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">🔒</div>
                                <h3>Secure & Private</h3>
                                <p>Your health data is encrypted and protected</p>
                            </motion.div>

                            <motion.div
                                className="feature-card"
                                whileHover={{ y: -10, backgroundColor: '#1a1a1a' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">⚡</div>
                                <h3>Quick Access</h3>
                                <p>Instant access to your medical information</p>
                            </motion.div>

                            <motion.div
                                className="feature-card"
                                whileHover={{ y: -10, backgroundColor: '#1a1a1a' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">👨‍⚕️</div>
                                <h3>Doctor Connect</h3>
                                <p>Easy sharing of medical records with healthcare providers</p>
                            </motion.div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="how-it-works">
                        <h2>How It Works</h2>
                        <div className="steps-container">
                            <motion.div
                                className="step"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="step-number">1</div>
                                <h3>Create Account</h3>
                                <p>Sign up and verify your identity</p>
                            </motion.div>

                            <motion.div
                                className="step"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="step-number">2</div>
                                <h3>Enter Details</h3>
                                <p>Add your medical information</p>
                            </motion.div>

                            <motion.div
                                className="step"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="step-number">3</div>
                                <h3>Get Your Card</h3>
                                <p>Access your digital health card</p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="cta-section">
                        <motion.div
                            className="cta-content"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2>Ready to Get Started?</h2>
                            <p>Join thousands of patients who trust Smart Health Card</p>
                            <motion.button
                                className="cta-button"
                                onClick={handleGetStarted}
                                whileHover={{ scale: 1.05, backgroundColor: '#2a2a2a' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Create Your Health Card Now
                            </motion.button>
                        </motion.div>
                    </section>

                    {/* Footer */}
                    <footer className="footer">
                        <div className="footer-content">
                            <div className="footer-section">
                                <h4>Smart Health Card</h4>
                                <p>Your digital health companion</p>
                            </div>
                            <div className="footer-section">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li>About Us</li>
                                    <li>Privacy Policy</li>
                                    <li>Terms of Service</li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                            <div className="footer-section">
                                <h4>Contact</h4>
                                <p>Email: support@smarthealthcard.com</p>
                                <p>Phone: (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p>&copy; 2025 Smart Health Card. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Home;
