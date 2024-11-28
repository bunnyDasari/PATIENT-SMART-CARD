require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const userDetails = require("./db")
const serectkey = "rohan124"
app.use(cors("*"))
app.use(express.json())

const PORT = process.env.PORT || 7000

app.get("/", async (req, res) => {
    const userData = await userDetails.find();
    res.json(userData);
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) res.send("fill the login details");
    const userLoginData = await userDetails.findOne({ username: username })
    if (!userLoginData) {
        res.send("User not found").status(404)
    } else {
        res.send(userLoginData).status(200)
    }


})

app.get('/user-details', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    console.log(req.headers.authorization)
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, serectkey);
        console.log(decoded)
        const user = await userDetails.findOne({ email: decoded.emial })
        console.log(user)
        res.json(user);
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
});


app.post("/post", async (req, res) => {
    const { username, email, password, firstName, secName, counrty, message, PhoneNo, BloodGroup, HealthHis } = req.body
    if (!username || !email || !password || !firstName || !secName || !counrty || !message || !PhoneNo || !BloodGroup || !HealthHis) {
        res.send("please fill all the details").status(400)
    }
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
        token: jwtToken,
        PhoneNo: PhoneNo,
        BloodGroup: BloodGroup,
        HealthHis: HealthHis
    };

    const userData = await userDetails.insertMany([dataUser])
    res.send(userData).status(200)

})


app.post("/paitantDetails", async (req, res) => {
    const { fullName, age, PhoneNo } = req.body
    if (!fullName || !age || !PhoneNo) res.send("please fill all the details...").status(400)

    const PatinetDetails = {
        fullName: fullName,
        PhoneNo: PhoneNo,
        age: age
    }
    const PatinetDetailsSend = await userDetails.insertMany([PatinetDetails])
    res.send(PatinetDetailsSend).status(200)
})


app.post("/feedback", async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) res.send("plse fill all the details").status(400);
    const feedbackData = {
        name: name,
        email: email,
        message: message
    }
    const feedbackDataSend = await userDetails.insertMany([feedbackData])
    res.send(feedbackDataSend).status(200)
})













app.listen(7000, () => {
    console.log(`server is running at port ${PORT}`);
})