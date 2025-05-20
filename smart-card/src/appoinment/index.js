import './index.css';
import React, { useState } from 'react';
import axios from 'axios';
const Appointment = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const response = await axios.post("https://patient-smart-card-6.onrender.com/appoinment", {
            name,
            email,
            date,
            time,
            service,
            message
        })
        console.log(response);
    };

    return (
        <div className="appointment-container">
            <h1>Book an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="service">Doctor:</label>
                    <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="">Select a service</option>
                        <option value="cardiologist">cardiologist</option>
                        <option value="dermatologist">dermatologist</option>

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Appointment