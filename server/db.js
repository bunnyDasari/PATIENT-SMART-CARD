const mongoose = require("mongoose");

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
    message: String,
    token: String
});

const userDetails = mongoose.model("userDetails", userSchema)

module.exports = userDetails