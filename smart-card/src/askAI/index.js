import React, { useState } from "react";
import "./AskAI.css";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
export default function AskAI() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [conditions, setConditions] = useState("");
    const [tips, setTips] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTips("");
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:7000/admin/ai/healthtips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    age: Number(age),
                    gender,
                    conditions: conditions.split(",").map((c) => c.trim()),
                }),
            });

            if (!res.ok) throw new Error("Failed to fetch AI tips");

            const data = await res.json();
            setTips(data.tips);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const onclickHome = () => {
        navigate("/")
    }
    return (
        <>
            <div className="ask-ai-container">

                <h2>🧠 Ask AI for Personalized Health Tips</h2>
                <form onSubmit={handleSubmit} className="ask-ai-form">
                    <label>
                        Age:
                        <input
                            type="number"
                            min="0"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Gender:
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    <label>
                        Conditions (comma-separated):
                        <input
                            type="text"
                            placeholder="e.g., diabetes, asthma"
                            value={conditions}
                            onChange={(e) => setConditions(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Get Tips"}
                    </button>
                </form>

                {error && <p className="error">{error}</p>}

                {tips && (
                    <div className="tips-output">
                        <h3>Health Tips:</h3>
                        <pre>{tips}</pre>
                    </div>
                )}
                {tips && <button type="submit" onClick={onclickHome}>
                    Home
                </button>}
            </div>
        </>
    );
}
