import "./index.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react"

const PatientCard = () => {
    const [viewDataBtn, setViewData] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [secName, setSecName] = useState("")
    const [email, setEmail] = useState("");
    const [counrty, setCountry] = useState("");
    const [message, setMessage] = useState("");
    

    let navigate = useNavigate();
    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const onChangeSecName = (e) => {
        setSecName(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangeCounty = (e) => {
        setCountry(e.target.value)
    }
    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }
    const onSubmitForm = async (event) => {
        event.preventDefault()
        setViewData(!viewDataBtn)
        const patientDetails = {
            firstName: firstName,
            secName: secName,
            email: email,
            counrty: counrty,
            message: message
        }
        
    }
    const onClickViewCard = () => {
        navigate("/card")
    }
    
    return (
        <div className="container">
            {!viewDataBtn && <form onSubmit={onSubmitForm}>
                <h1 className="para">please enter your health Deatils</h1>
                <div>
                    <input type="text" placeholder="First Name" className="input-ele" required onChange={onChangeFirstName} />
                </div>
                <div>
                    <input type="text" placeholder="Secound Name" className="input-ele" required onChange={onChangeSecName} />
                </div>
                <div>
                    <input type="text" placeholder="Email" className="input-ele" required onChange={onChangeEmail} />
                </div>
                <div>
                    <input type="text" placeholder="Country" className="input-ele" required onChange={onChangeCounty} />
                </div>
                <div>
                    <input type="text-area" placeholder="message" className="input-ele" onChange={onChangeMessage} />
                </div>
                <button className="btn-ele">Submit</button>
            </form>}
            {viewDataBtn && <button className="btn-ele" onClick={onClickViewCard}>View your card</button>}
            
        </div>
    )
}
export default PatientCard