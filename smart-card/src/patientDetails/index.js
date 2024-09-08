import "./index.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
const PatientCard = () => {
    const [viewDataBtn, setViewData] = useState(false)
    let navigate = useNavigate();
    const onSubmitForm = (event) => {
        event.preventDefault()
        setViewData(!viewDataBtn)
    }
    const onClickViewCard = () => {
        navigate("/card")
    }

    return (
        <div className="container">
            {!viewDataBtn && <form onSubmit={onSubmitForm}>
                <h1 className="para">please enter your health Deatils</h1>
                <div>
                    <input type="text" placeholder="First Name" className="input-ele" required />
                </div>
                <div>
                    <input type="text" placeholder="Secound Name" className="input-ele" required />
                </div>
                <div>
                    <input type="text" placeholder="Email" className="input-ele" required />
                </div>
                <div>
                    <input type="text" placeholder="Country" className="input-ele" required />
                </div>
                <div>
                    <input type="text-area" placeholder="message" className="input-ele" required />
                </div>
                <button className="btn-ele">Submit</button>
            </form>}
            {viewDataBtn && <button className="btn-ele" onClick={onClickViewCard}>View your card</button>}
        </div>
    )
}
export default PatientCard