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

    /*const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
        })
        navigate("/")

    }
   
    
    const errorMsg = (errorMsg) => {
        setError(errorMsg)
    }*/

    const onSignUp = () => {
        navigate("/signup")
    }
    const onSubmitBtn = async (e) => {
        e.preventDefault()

        const response = await axios.get("http://localhost:7000/")
        const data = await response.data

        const isthere = data.filter(each => each.username === username)

        console.log(isthere.length)

        if (isthere.length === 0) {
            isSignUp(!signUp)
        } else {
            navigate("/card")
        }

        /*
        if (response.status === 200) {
            onSubmitSuccess(data.jwt_token)
        } else {
            errorMsg(data.error_msg)
        }*/

    }

    const jwt = Cookies.get("jwt_token")
    //if (jwt !== undefined) {
    // return navigate("/home")
    //}
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
                        {!signUp && <button className="custom-button inp-username btn">
                            Submit
                        </button>}


                    </form>
                    {signUp && <button className="custom-button inp-username btn" onClick={onSignUp}>
                        Sign Up
                    </button>}

                    {signUp && <p>sign up...</p>}



                </div >
            </div >
        </>
    )
}
export default Login