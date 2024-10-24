import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PatientCard.css';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Card = () => {
  const [userName, setUserName] = useState({ name: "" })
  useEffect(() => {
    const renderName = async () => {
      const response = await axios.get("http://localhost:7000/")
      const data = await response.data
      setUserName({ name: data[data.length - 1].username });
      console.log(data.length);
    }
    renderName();
  }, [])
  const navigate = useNavigate()
  const onClickSignOut = () => {
    Cookies.remove("jwt_token")
    navigate("/")

  }

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
        className="card"

      >
        <h2>{userName.name}</h2>
        <p>Age: 45</p>
        <p>Condition: Stable</p>
      </motion.div>
      <button onClick={onClickSignOut}>Sign Out</button>
    </div>
  );
};

export default Card;
