const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors())
app.use(express.json())

const db = mongoose.connect("mongodb+srv://rohandb:rohandb123@testdata.kdgizeo.mongodb.net/carddetails")
db.then(() => {
    console.log("db connected")
}).catch((error) => {
    console.log(error)
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    secName: String,
    counrty: String,
    message: String
});

const userDetails = mongoose.model("userDetails", userSchema)

app.get("/", async (req, res) => {
    const userData = await userDetails.find();
    res.json(userData);
})
app.post("/post", async (req, res) => {
    const { username, email, password, firstName, secName, counrty, message } = req.body

    const dataUser = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        secName: secName,
        counrty: counrty,
        message: message
    };
    const userData = await userDetails.insertMany([dataUser])
    res.json(userData)






})

app.post("/health-card", async (req, res) => {
    const { firstName, secName, counrty, message, email } = req.body;
    const cardData = {
        firstName: firstName,
        secName: secName,
        counrty: counrty,
        message: message,
        email: email,
    }
    const cardUserData = await userDetails.insertMany([cardData]);
    res.json(cardUserData)
})
























app.listen(7000, () => {
    console.log("server is running at port 7000");
})