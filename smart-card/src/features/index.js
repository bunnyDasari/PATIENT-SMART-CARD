import React from 'react';
import './index.css';
import Navbar from '../navbar';


const Features = () => {
  return (
    <>
    <Navbar />
    <div className="features-page">
      <h1 className="features-header">Explore the Features of Patient Smart Card</h1>
      <p className="features-subheader">Learn how the Patient Smart Card can enhance your healthcare experience.</p>

      <div className="feature-item animate-fade-in">
        
        <div className="feature-text">
          <h2>Easy Access</h2>
          <p>Access your medical records from any device, anytime and anywhere. The Patient Smart Card simplifies record-keeping for patients and healthcare providers alike.</p>
        </div>
      </div>

      <div className="feature-item animate-fade-in delay-1">
      
        <div className="feature-text">
          <h2>Secure Data Storage</h2>
          <p>All health information is securely stored, ensuring privacy and confidentiality for each patient. Only authorized users have access to the data.</p>
        </div>
      </div>

      <div className="feature-item animate-fade-in delay-2">
      
        <div className="feature-text">
          <h2>Real-Time Updates</h2>
          <p>Get real-time updates on your health information from your healthcare provider. Stay informed about appointments, prescriptions, and test results.</p>
        </div>
      </div>
      
      <div className="feature-item animate-fade-in delay-3">
        
        <div className="feature-text">
          <h2>Portability</h2>
          <p>Carry your Patient Smart Card wherever you go, allowing healthcare providers quick and easy access to your medical history.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Features;