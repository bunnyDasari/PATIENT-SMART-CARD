import "./index.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios";
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
export default PatientCard