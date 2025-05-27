import "./index.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios";
import React from 'react';
import { motion } from "framer-motion";

const PatientCard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState("");
    const [viewDataBtn, setViewData] = useState(false);
    const [onClickOtp, setOnCLickOtp] = useState(false)
    const [copied, setCopied] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        bloodGroup: '',
        emergencyContact: '',
        medicalHistory: '',
        allergies: '',
        doctorId: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();


        const patientDetails = {
            fullName: formData.fullName,
            age: formData.age,
            PhoneNo: formData.phone,
            email: formData.email,
            BloodGroup: formData.bloodGroup,
            HealthHis: formData.medicalHistory,
            doctorId: formData.doctorId
        };

        try {
            if (onClickOtp) {
                const dataResponse = await axios.post(
                    "https://patient-smart-card-6.onrender.com/user/user-details",
                    patientDetails,
                    {
                        headers: {
                            token: Cookies.get("jwt_token")
                        }
                    }
                );
                setViewData(!viewDataBtn);
                console.log(dataResponse.data);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const onClickViewCard = () => {
        navigate("/card");
    };

    const onClickSendOtp = async () => {
        try {
            const response = await axios.post(
                "https://patient-smart-card-6.onrender.com/user/send-otp",
                {
                    email: formData.email
                }
            );
            if (response.status === 200) {
                setShowOtpPopup(true);
                setOnCLickOtp(true)
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(
                "https://patient-smart-card-6.onrender.com/user/verify-otp",
                {
                    email: formData.email,
                    otp: otp
                }
            );
            if (response.status === 200) {
                setShowOtpPopup(false);
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };

    const handleCopyDoctorId = () => {
        navigator.clipboard.writeText('6823424783783ce2ede8a166');
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <motion.div
            className="patient-details-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="patient-details-card">
                <div className="card-header">
                    <h1>Patient Information</h1>
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('personal')}
                        >
                            Personal Info
                        </button>

                    </div>
                </div>

                {!viewDataBtn ? (
                    <form onSubmit={onSubmitForm} className="patient-form">
                        {activeTab === 'personal' && (
                            <motion.div
                                className="form-section"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter full name"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="email-input-group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter email address"
                                            className="form-input"
                                            required
                                        />
                                        <motion.button
                                            type="button"
                                            className="otp-button"
                                            onClick={onClickSendOtp}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Send OTP
                                        </motion.button>
                                    </div>
                                    {!onClickOtp && <p>**Verify your Email**</p>}
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter phone number"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter full address"
                                        className="form-input address-input"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <button
                                    className={`tab ${activeTab === 'medical' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('medical')}
                                >
                                    Medical Info
                                </button>
                            </motion.div>

                        )}



                        {activeTab === 'medical' && (
                            <motion.div
                                className="form-section"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Blood Group</label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="">Select blood group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Emergency Contact</label>
                                        <input
                                            type="tel"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleInputChange}
                                            placeholder="Emergency contact number"
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Medical History</label>
                                    <textarea
                                        name="medicalHistory"
                                        value={formData.medicalHistory}
                                        onChange={handleInputChange}
                                        placeholder="Enter any relevant medical history"
                                        className="form-input medical-history"
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Allergies</label>
                                    <textarea
                                        name="allergies"
                                        value={formData.allergies}
                                        onChange={handleInputChange}
                                        placeholder="Enter any allergies"
                                        className="form-input allergies"
                                        rows="2"
                                    />
                                </div>
                                <div className="doctor-id-copy-row">
                                    <p style={{ margin: 0 }}>doctorId : <span className="doctor-id-value">6823424783783ce2ede8a166</span></p>
                                    <button type="button" className="copy-btn" onClick={handleCopyDoctorId} title="Copy doctorId">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                    </button>
                                    {copied && <span className="copied-msg">Copied!</span>}
                                </div>
                                <div className="form-group">
                                    <label>Doctor ID</label>
                                    <input
                                        type="text"
                                        name="doctorId"
                                        value={formData.doctorId}
                                        onChange={handleInputChange}
                                        placeholder="Enter doctor ID"
                                        className="form-input"
                                        required
                                    />
                                </div>

                            </motion.div>
                        )}

                        {activeTab === "medical" && < div className="button-group">
                            <motion.button
                                type="submit"
                                className="save-button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Submit
                            </motion.button>
                        </div>}
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="view-card-section"
                    >
                        <motion.button
                            className="save-button"
                            onClick={onClickViewCard}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View your card
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {
                showOtpPopup && (
                    <motion.div
                        className="otp-popup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="otp-popup-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3>Enter OTP</h3>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="form-input"
                            />
                            <div className="otp-buttons">
                                <motion.button
                                    onClick={verifyOtp}
                                    className="save-button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Verify
                                </motion.button>
                                <motion.button
                                    onClick={() => setShowOtpPopup(false)}
                                    className="cancel-button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </motion.div >
    );
};

export default PatientCard;