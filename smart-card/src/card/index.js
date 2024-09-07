import React from "react";
import "./index.css";

const Card = () => {
    return (
        <div className="dashboard">
            <h1>Health Card Dashboard</h1>
            <div className="cards-container">
                <div className="card">
                    <h2>Personal Info</h2>
                    <p>Name: John Doe</p>
                    <p>Age: 28</p>
                    <p>Blood Group: O+</p>
                    <button className="download-button">
                        Download
                    </button>
                </div>
                <div className="card">
                    <h2>Medical History</h2>
                    <p>Diabetes: No</p>
                    <p>Allergies: None</p>
                    <p>Last Check-up: 01-Jan-2024</p>
                    <button className="download-button">
                        Download
                    </button>
                </div>
                <div className="card">
                    <h2>Health Metrics</h2>
                    <p>Weight: 70kg</p>
                    <p>Height: 175cm</p>
                    <p>BMI: 22.9</p>
                    <button className="download-button">
                        Download
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Card
