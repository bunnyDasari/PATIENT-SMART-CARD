import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [signUp, isSignUp] = useState(false);
    let navigate = useNavigate();

    const onChangeName = (e) => setUsername(e.target.value);
    const onChangePass = (e) => setPassword(e.target.value);

    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, { expires: 30 });
    };

    const onSignUp = () => navigate("/signup");

    const onSubmitBtn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/user/login", { username, password });
            const data = response.data;
            console.log(data)
            if (data.token === undefined) {
                isSignUp(true);
            } else {
                navigate("/card");
                onSubmitSuccess(data.token);
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1 className="login-heading">Welcome 🙌</h1>
                <form onSubmit={onSubmitBtn}>
                    <div className="cont">
                        <input
                            onChange={onChangeName}
                            type="text"
                            placeholder="Username"
                            value={username}
                            className="inp-username"
                        />
                    </div>
                    <div className="cont">
                        <input
                            onChange={onChangePass}
                            type="password"
                            placeholder="Password"
                            value={password}
                            className="inp-username"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="custom-button">
                        Login
                    </button>
                </form>
                <button onClick={onSignUp} className="custom-button">
                    Sign Up
                </button>
                {signUp && <p className="user-found">User not found</p>}
            </div>
        </div>
    );
};

export default Login;
