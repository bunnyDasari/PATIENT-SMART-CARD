require('dotenv').config()
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL

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
    token: String,
    PhoneNo: Number,
    fullName: String,
    age: Number,
    name: String,
    message: String,
    BloodGroup: String,
    HealthHis: String
});

const userDetails = mongoose.model("userDetails", userSchema)

module.exports = userDetails
