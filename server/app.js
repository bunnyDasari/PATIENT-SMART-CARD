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
    password: String
});

const userDetails = mongoose.model("userDetails", userSchema)

app.get("/", async (req, res) => {
    const userData = await userDetails.find();
    res.json(userData);
})
app.post("/post", async (req, res) => {
    const { username, email, password } = req.body
    const dataUser = {
        username: username,
        email: email,
        password: password
    }
    
    const userData = await userDetails.insertMany([dataUser])
    res.json(userData)
})


























app.listen(7000, () => {
    console.log("server is running at port 7000");
})