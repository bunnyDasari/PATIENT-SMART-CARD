import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [PhoneNo, setPhone] = useState("")
    const [BloodGroup, setBloodGroup] = useState("")
    const [HealthHis, setHelathHis] = useState("")
    const [matchPassword, setMatchPassword] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const [userSignUp, setuserSignUp] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMatchPassword(!matchPassword);
        } else {
            const userDetails = {
                username, email, password
            }
            console.log(userDetails);
        }

        const response = await axios.get("http://localhost:7000/")
        const data = await response.data
        const checkMail = await data.filter(each => each.email === email)

        if (checkMail.length > 0) {
            setUserExist(!userExist)
        } else {
            const userDetails = {
                username: username,
                email: email,
                password: password,
                PhoneNo: PhoneNo,
                BloodGroup: BloodGroup,
                HealthHis: HealthHis
            }
            await axios.post("http://localhost:7000/signup", userDetails).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err))
            setuserSignUp(!userSignUp)
            navigate("/login")
        }
        console.log(checkMail)



    };

    return (
        <div className="signup-container">
            <h2 className="signup-header">Signup With your Helath Details</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="input-group">
                    <label className="label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                {/* <div className="input-group">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                </div> */}
                <div className="input-group">
                    <label className="label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                {/* <div className="input-group">
                    <label className="label">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Phone No</label>
                    <input
                        type="text"
                        value={PhoneNo}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Blood group</label>
                    <input
                        type="text"
                        value={BloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Past medical Histry</label>
                    <input
                        type="text"
                        value={HealthHis}
                        onChange={(e) => setHelathHis(e.target.value)}
                        className="input"
                        required
                    />
                </div> */}
                <button type="submit" className="signup-button">Signup</button>
                {matchPassword && <p>Password not Matched</p>}
            </form>
            {userExist && <p className='user-signed'>Email already exsist</p>}
            {userSignUp && <p className='user-signed'>signed up!!</p>}
        </div>
    );
}

export default Signup;
