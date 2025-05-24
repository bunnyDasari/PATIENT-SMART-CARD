import "./index.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios";
import React from 'react';

const PatientCard = () => {
    const [viewDataBtn, setViewData] = useState(false)
    const [fullName, setFullName] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("");
    const [emial, setEmail] = useState("")
    const [blood, setBlood] = useState("")
    const [health, setHelth] = useState("")
    const [doctor, setDoctor] = useState("")

    let navigate = useNavigate();

    const onSubmitForm = async (event) => {
        event.preventDefault()
        setViewData(!viewDataBtn)
        const patientDetails = {
            fullName: fullName,
            age: age,
            PhoneNo: phone,
            email: emial,
            BloodGroup: blood,
            HealthHis: health,
            doctorId: doctor
        }

        await axios.post("https://patient-smart-card-6.onrender.com/user/user-details", patientDetails, {
            headers: {
                token: Cookies.get("jwt_token")
            }
        }).then(() => {
            console.log("Data Sent....")
        }).catch((error) => {
            console.log("Data error", error)
        })


    }
    const onClickViewCard = () => {
        navigate("/card")
    }
    console.log(emial)
    const onClickSendOtp = async () => {
        const response = await axios.post("https://patient-smart-card-6.onrender.com/user/send-otp", {
            email: emial
        })
        console.log(response)

        if (response.status === 200) {
            Cookies.set("email", emial)
            navigate("/otpverify")
        }
    }
    return (
        <div className="container-patient">
            {!viewDataBtn && <form onSubmit={onSubmitForm}>
                <h1 className="para">please enter your health Deatils</h1>
                <div>
                    <input type="text" placeholder="Full Name" className="input-ele" required onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Age" className="input-ele" required onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Phone" className="input-ele" required onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Email" className="input-ele" required onChange={(e) => setEmail(e.target.value)} />
                    <button className="btn-ele2" onClick={onClickSendOtp}>Send OTP</button>
                </div>
                <div>
                    <input type="text" placeholder="Blood group" className="input-ele" required onChange={(e) => setBlood(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Health status" className="input-ele" required onChange={(e) => setHelth(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Doctor id" className="input-ele" required onChange={(e) => setDoctor(e.target.value)} />
                </div>
                <button className="btn-ele">Submit</button>
            </form>}
            {viewDataBtn && <button className="btn-ele" onClick={onClickViewCard}>View your card</button>}

        </div >
    )
}

const PatientDetails = () => {
    return (
        <div className="patient-container">
            <div className="patient-box">
                <h2>Patient Information</h2>

                <div className="form-section">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="form-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select className="form-input">
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            placeholder="Enter full address"
                            className="form-input address-input"
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Blood Group</label>
                            <select className="form-input">
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
                                placeholder="Emergency contact number"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Medical History</label>
                        <textarea
                            placeholder="Enter any relevant medical history"
                            className="form-input medical-history"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label>Allergies</label>
                        <textarea
                            placeholder="Enter any allergies"
                            className="form-input allergies"
                            rows="2"
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button className="save-button">Save Information</button>
                    <button className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PatientCard