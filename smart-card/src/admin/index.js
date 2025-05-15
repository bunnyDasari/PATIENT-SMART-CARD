import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

const Admin = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("jwt_token");
        const api = async () => {
            try {
                const response = await axios.get("http://localhost:7000/admin/user-details", {
                    headers: {
                        token: token
                    }
                });
                setPatients(response.data.paitantData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching patients:", error);
                setError("Failed to fetch patient data. Please try again.");
                setLoading(false);
            }
        };
        api();
    }, []);
    
    
    
    const handleLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/adminLogin");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    if (loading) {
        return (
            <motion.div
                className="loading-spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                Loading...
            </motion.div>
        );
    }

    return (
        <motion.div
            className="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.header
                className="admin-header"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <h1>Admin Dashboard</h1>
                <motion.button
                    onClick={handleLogout}
                    className="logout-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Logout
                </motion.button>
            </motion.header>

            <motion.div
                className="dashboard-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="stats-container" variants={itemVariants}>
                    <motion.div
                        className="stat-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3>Total Patients</h3>
                        <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                            {patients.length}
                        </motion.p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="patients-table-container"
                    variants={itemVariants}
                >
                    <h2>Patient Records</h2>
                    {error && (
                        <motion.p
                            className="error-message"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.p>
                    )}
                    <div className="table-responsive">
                        <table className="patients-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Blood Group</th>
                                    <th>Health History</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {patients.map((patient, index) => (
                                        <motion.tr
                                            key={patient._id}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            custom={index}
                                        >
                                            <td>{patient.fullName}</td>
                                            <td>{patient.email}</td>
                                            <td>{patient.PhoneNo}</td>
                                            <td>{patient.BloodGroup}</td>
                                            <td>{patient.HealthHis}</td>
                                            <td>
                                                <motion.button
                                                    className="action-button view"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    View
                                                </motion.button>
                                                <motion.button
                                                    className="action-button edit"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Edit
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Admin;
