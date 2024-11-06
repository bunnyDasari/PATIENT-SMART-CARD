import React from 'react';
import './index.css';
import Navbar from '../navbar';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="card-section">
                    <img src="https://img.freepik.com/premium-photo/healthcare-smart-card-icon-digital-health-medical-consultation-medical-information-smart-card_1240525-16119.jpg" alt="Patient Smart Card" className="card-image" />
                    <div className="card-description">
                        <h2>What is the Patient Smart Card?</h2>
                        <p>
                            The Patient Smart Card is an innovative solution that allows patients to store and
                            access their healthcare information securely. It serves as a centralized hub for all
                            medical records, making it easier to share critical data with healthcare providers
                            and improve patient care. This card is designed to be user-friendly, safe, and
                            reliable, ensuring privacy and accessibility for all users.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
