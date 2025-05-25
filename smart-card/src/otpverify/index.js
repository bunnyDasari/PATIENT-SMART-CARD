import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    // console.log(typeof (otp))
    const inputRefs = useRef([]);
    const navigate = useNavigate()
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = otp.split('');
        newOtp[index] = value;
        setOtp(newOtp.join(''));

        // Move to next input if current input is filled
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (pastedData.length) {
            setOtp(pastedData);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (otp.length === 6) {
    //         // Handle OTP verification logic here
    //         console.log('OTP submitted:', otp);
    //     }
    // };
    const emial = Cookies.get("email")
    const handleSubmitOtp = async () => {
        try {
            const response = await axios.post("https://patient-smart-card-6.onrender.com/user/verify-otp", {
                email: emial,
                otp: otp
            });

            if (response.data && response.data.success) {
                Cookies.remove("email");
                navigate("/patient");
            } else {
                console.error("OTP verification failed:", response.data.message);

            }
        } catch (error) {
            console.error("Error verifying OTP:", error.response?.data?.message || error.message);

        }
    }

    return (
        <div className="otp-container">
            <div className="otp-box">
                <h2>Verify Your Email</h2>
                <p className="subtitle">Enter the 6-digit code sent to your phone</p>

                <form>
                    <div className="otp-inputs">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={otp[index] || ''}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                className="otp-input"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="verify-button"
                        disabled={otp.length !== 6}
                        onClick={handleSubmitOtp}
                    >
                        Verify
                    </button>
                </form>

                <div className="resend-section">
                    <p>Didn't receive the code?</p>
                    <button className="resend-button">Resend Code</button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
