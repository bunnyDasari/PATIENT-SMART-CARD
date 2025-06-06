require('dotenv').config()
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL
const objectId = mongoose.Schema.ObjectId
const db = mongoose.connect(process.env.MONGO_URL)
db.then(() => {
    console.log("db connected")
}).catch((error) => {
    console.log(error)
})
const userSign = new mongoose.Schema({
    username: String,
    password: String,
})
const userSchema = new mongoose.Schema({
    userId: objectId,
    fullName: String,
    age: Number,
    PhoneNo: Number,
    email: String,
    BloodGroup: String,
    HealthHis: String,
    doctor: objectId
});
const adminSign = new mongoose.Schema({
    username: String,
    password: String
})
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
})

const otpModel = mongoose.model("otp", otpSchema)
const userDetails = mongoose.model("userDetails", userSchema)
const userSignData = mongoose.model("users", userSign)
const adminSignDetails = mongoose.model("adminLogin", adminSign)

module.exports = { userDetails, userSignData, adminSignDetails, otpModel }
