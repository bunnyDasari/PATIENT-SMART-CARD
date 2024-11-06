import React, { useState } from 'react';
import './index.css';
import Navbar from '../navbar';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    const onClickFeedback = () => {
        setFeedback(!onFeedback)
    }
    return (
        <>
            <Navbar />
            {onFeedback ? (<div className="contact-page animate-fade-in">
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
            </div>) : (<div>
                <img src="https://media.istockphoto.com/id/670634442/photo/business-woman-hands-holding-white-card-sign-with-thank-you-for-your-feedback-text-message.jpg?s=612x612&w=0&k=20&c=DlgkFRembc-YXIyHB86jFSxoHXG7MRC84wresMlypks=" />
            </div>)}


        </>
    );
};

export default Contact;
