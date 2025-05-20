import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PatientCard.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [userName, setUserName] = useState({ name: "", age: "", phone: "", bloodGroup: "", HealthHis: "" });
  const token = Cookies.get("jwt_token");
  const navigate = useNavigate();

  useEffect(() => {
    const renderName = async () => {
      try {
        const response = await axios.get("https://patient-smart-card-6.onrender.com/user/userData", {
          headers: {
            token: token
          },
        });

        const data = response.data.userFind;
        if (response.data.userFind === null) {
          navigate("/patient")
        } else {
          console.log("no nulll")
        }
        console.log(response.data)
        setUserName({ name: data.fullName, age: data.email, phone: data.PhoneNo, bloodGroup: data.BloodGroup, HealthHis: data.HealthHis });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    renderName();
  }, [])

  // setTimeout(() => {
  //   renderName();
  // }, 2000);




  const onClickSignOut = () => {
    Cookies.remove("jwt_token");
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <div className="container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
        className="card"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants}>Name: {userName.name}</motion.h2>
          <motion.p variants={itemVariants}>Age: {userName.age}</motion.p>
          <motion.p variants={itemVariants}>Phone: {userName.phone}</motion.p>
          <motion.p variants={itemVariants}>Blood Group: {userName.bloodGroup}</motion.p>
          <motion.p variants={itemVariants}>Health History: {userName.HealthHis}</motion.p>
        </motion.div>
      </motion.div>
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClickSignOut}
      >
        Sign Out
      </motion.button>
    </div>
  );
};

export default Card;
