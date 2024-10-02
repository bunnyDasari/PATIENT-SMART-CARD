import React from 'react';
import { motion } from 'framer-motion';
import './PatientCard.css';  

const PatientCard = () => {
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
        <h2>Patient Name</h2>
        <p>Age: 45</p>
        <p>Condition: Stable</p>
      </motion.div>
    </div>
  );
};

export default PatientCard;
