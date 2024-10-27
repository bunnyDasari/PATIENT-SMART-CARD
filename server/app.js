const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const userDetails = require("./db")
const serectkey = "rohan124"
app.use(cors("*"))
app.use(express.json())


app.get("/", async (req, res) => {
    const userData = await userDetails.find();
    res.json(userData);
})
app.post("/post", async (req, res) => {
    const { username, email, password, firstName, secName, counrty, message } = req.body
    const jwtToken = jwt.sign({
        emial: email
    }, serectkey)

    const dataUser = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        secName: secName,
        counrty: counrty,
        message: message,
        token: jwtToken

    };

    const userData = await userDetails.insertMany([dataUser])
    res.send(userData)

})
app.post("/paitantDetails", async (req, res) => {
    const { fullName, age, PhoneNo } = req.body
    const PatinetDetails = {
        fullName: fullName,
        PhoneNo: PhoneNo,
        age: age
    }
    const PatinetDetailsSend = await userDetails.insertMany([PatinetDetails])
    res.send(PatinetDetailsSend)
})

























app.listen(7000, () => {
    console.log("server is running at port 7000");
})