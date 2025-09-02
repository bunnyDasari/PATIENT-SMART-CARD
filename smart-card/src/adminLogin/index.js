import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"
import "./index.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChangeName = (e) => setUsername(e.target.value);
    const onChangePass = (e) => setPassword(e.target.value);

    const onSubmitBtn = async (e) => {
        e.preventDefault();
        const response = await axios.post("https://patient-smart-card-6.onrender.com/admin/login", { username, password })
        // console.log(response)
        if (response.data.token) {
            Cookies.set("jwt_token", response.data.token, { expires: 3 })
            navigate("/admin")
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-form-container">
                <h1 className="admin-login-heading">Admin Login</h1>
                <form onSubmit={onSubmitBtn}>
                    <div className="admin-input-container">
                        <input
                            onChange={onChangeName}
                            type="text"
                            placeholder="Admin Username"
                            value={username}
                            className="admin-input"
                            required
                        />
                    </div>
                    <div className="admin-input-container">
                        <input
                            onChange={onChangePass}
                            type="password"
                            placeholder="Password"
                            value={password}
                            className="admin-input"
                            required
                        />
                    </div>
                    {error && <p className="admin-error-message">{error}</p>}
                    <button type="submit" className="admin-login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;