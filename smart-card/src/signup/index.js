import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const [userSignUp, setuserSignUp] = useState(false)
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
                password: password
            }
            await axios.post("http://localhost:7000/post", userDetails).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err))
            setuserSignUp(!userSignUp)
        }
        console.log(checkMail)



    };

    return (
        <div className="signup-container">
            <h2 className="signup-header">Signup</h2>
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
                <div className="input-group">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                </div>
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
                <div className="input-group">
                    <label className="label">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Signup</button>
                {matchPassword && <p>Password not Matched</p>}
            </form>
            {userExist && <p>Email already exsist</p>}
            {userSignUp && <p>signed up!!</p>}
        </div>
    );
}

export default Signup;
