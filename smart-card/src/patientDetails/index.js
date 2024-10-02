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
    const [bloodGroup,setBloodGroup] = useState("")
    const [MedicalCondition,setMedicalCondition] = useState("");
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
    const onChangeBloodGroup = (e)=>{
       setBloodGroup(e.target.value)
    }
    const onChangeMedicalCondition = (e)=>{
      setMedicalCondition(e.target.value)
    }
    const onChangePastMedicalHistory = e =>{

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
        <div className="container-patient">
            {!viewDataBtn && <form onSubmit={onSubmitForm}>
                <h1 className="para">please enter your health Deatils</h1>
                <div>
                    <input type="text" placeholder="Full Name" className="input-ele" required onChange={onChangeFirstName} />
                </div>
                <div>
                    <input type="text" placeholder="Age" className="input-ele" required onChange={onChangeSecName} />
                </div>
                <div>
                    <input type="text" placeholder="Phone" className="input-ele" required onChange={onChangeEmail} />
                </div>
                <div>
                    <input type="text" placeholder="Emergency Contact" className="input-ele" required onChange={onChangeCounty} />
                </div>
                <div>
                    <input type="number" placeholder="Address" className="input-ele" onChange={onChangeMessage} />
                </div>
                <div>
                    <input type="text" placeholder="Blood Group" className="input-ele" onChange={onChangeBloodGroup} />
                </div>
                <div>
                    <input type="text" placeholder="Medical Condition" className="input-ele" onChange={onChangeMedicalCondition} />
                </div>
                <div>
                    <input type="text" placeholder="Past Medical History" className="input-ele" onChange={onChangePastMedicalHistory} />
                </div>
                <div>
                    <input type="text" placeholder="Family Medical History" className="input-ele" onChange={onChangeMessage} />
                </div>
                <div>
                    <input type="text" placeholder="Primary Physician" className="input-ele" onChange={onChangeMessage} />
                </div>
                <div>
                    <input type="text" placeholder="Next Appointment" className="input-ele" onChange={onChangeMessage} />
                </div>
                <div>
                    <input type="text" placeholder="Location" className="input-ele" onChange={onChangeMessage} />
                </div>
                
                <button className="btn-ele">Submit</button>
            </form>}
            {viewDataBtn && <button className="btn-ele" onClick={onClickViewCard}>View your card</button>}
            
        </div>
    )
}
export default PatientCard