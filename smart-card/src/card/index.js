import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PatientCard.css';
import Cookies from 'js-cookie'
import axios from 'axios';
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
  console.log(Cookies.get("jwt_token"))
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
    </div>
  );
};

export default Card;
