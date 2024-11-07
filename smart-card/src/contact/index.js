import React, { useState } from 'react';
import './index.css';
import Navbar from '../navbar';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [onFeedback, setFeedback] = useState(true)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        const response = await axios.post("http://localhost:7000/feedback", formData)
        const data = await response.data
        console.log(data)
    };
    console.log(formData)

    const onClickFeedback = () => {
        setFeedback(!onFeedback)
    }
    return (
        <>
            <Navbar />
            <div className="contact-page animate-fade-in">
                <h1 className="contact-header">Get in Touch</h1>
                <p className="contact-subheader">We'd love to hear from you! Feel free to reach out with any questions or feedback.</p>

                <form className="contact-form animate-slide-up" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="form-input"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="form-input"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        className="form-textarea"
                    />
                    <button type="submit" className="submit-button" onClick={onClickFeedback}>Send Message</button>
                </form>

                <div className="contact-info">
                    <p>Email: <a href="mailto:contact@patientsmartcard.com">contact@patientsmartcard.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </div>
            </div>)


        </>
    );
};

export default Contact;
