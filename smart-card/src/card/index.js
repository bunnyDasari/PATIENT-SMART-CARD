import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PatientCard.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [userName, setUserName] = useState({ name: "", age: "", phone: "" });
  const token = Cookies.get("jwt_token");
  const navigate = useNavigate();

  useEffect(() => {
    const renderName = async () => {
      try {
        const response = await axios.get("http://localhost:7000/user-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        console.log(data.username)
        setUserName({ name: data.username, age: data.email, phone: data.PhoneNo });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    renderName();
  }, [token]);

  

  const onClickSignOut = () => {
    Cookies.remove("jwt_token");
    navigate("/");
  };

  return (
    <div className="container">
      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 15,
          duration: 0.5,
        }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="card"
      >
        <h2>{userName.name}</h2>
        <p>Age: {userName.age}</p>
        <p>Phone: {userName.phone}</p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClickSignOut}
      >
        Sign Out
      </motion.button>
    </div>
  );
};

export default Card;
