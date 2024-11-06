import React from 'react';
import './index.css';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const onClickStart = () => {
        navigate("/login")
    }
    return (
        <>
            <Navbar />
            <div className="home">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Welcome to the Future of Healthcare</h1>
                        <p className="hero-subtitle">
                            The Patient Smart Card provides secure, easy access to your health information anytime, anywhere.
                        </p>
                        <button className="cta-button" onClick={onClickStart}>Get Started</button>
                    </div>
                    <img src="https://img.freepik.com/free-vector/healthcare-smart-card-abstract-concept-illustration-manage-patient-identity-practitioners-pharmacists-secure-access-medical-records-improved-communication_335657-884.jpg?w=360" alt="Patient Smart Card" className="hero-image" />
                </section>
            </div>
        </>
    );
};

export default Home;
