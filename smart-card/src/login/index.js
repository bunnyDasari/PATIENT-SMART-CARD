import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import "./index.css"
import axios from "axios"
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [signUp, isSignUp] = useState(false)
    const onChangeName = (e) => {
        setUsername(e.target.value)
    }
    const onChangePass = (e) => {
        setPassword(e.target.value)
    }
    let navigate = useNavigate();

    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
        })

    }
    const onSignUp = () => {
        navigate("/signup")
    }
    const onSubmitBtn = async (e) => {
        e.preventDefault()
        const checkUser = Cookies.get("jwt_token")
        const response = await axios.get("http://localhost:7000/")
        const data = await response.data
        console.log(data)
        const isthere = data.filter(each => each.username === username)
        const jwtToken = data.find(token => token.token)
        console.log(jwtToken.token)

        if (isthere.length === 0) {
            isSignUp(!signUp)
        } else {
            navigate("/patient")
        }

        if (response.status === 200) {
            onSubmitSuccess(jwtToken.token)
        }

    }


    return (

        <>

            <div className="login-page">
                < div className="login-form-container" >
                    <h1 className="login-heading">Welcome 🙌</h1>
                    <form onSubmit={onSubmitBtn}>
                        <div className="cont">
                            <input onChange={onChangeName} type="text" placeholder="username" value={username} className="inp-username" />
                        </div>
                        <div className="cont">
                            <input onChange={onChangePass} type="password" placeholder="password" value={password} className="inp-username" />
                        </div>
                        <p className="error-message">{error}</p>
                        <button className="custom-button inp-username btn">
                            Submit
                        </button>


                    </form>
                    <button className="custom-button inp-username btn" onClick={onSignUp}>
                        Sign Up
                    </button>

                    {signUp && <p className="user-found">User not found</p>}

                </div >
            </div >
        </>
    )
}
export default Login