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

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) res.send("fill the login details");
    const userLoginData = await userDetails.findOne({ username: username })
    res.send(userLoginData)
    if (!userLoginData) res.send("user not found.");
})

app.get('/user-details', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
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
    const { username, email, password, firstName, secName, counrty, message, PhoneNo } = req.body
    if (!username || !email || !password || !firstName || !secName || !counrty || !message || !PhoneNo) {
        res.send("please fill all the details")
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
        PhoneNo: PhoneNo

    };

    const userData = await userDetails.insertMany([dataUser])
    res.send(userData)

})


app.post("/paitantDetails", async (req, res) => {
    const { fullName, age, PhoneNo } = req.body
    if (!fullName || !age || !PhoneNo) res.send("please fill all the details...")

    const PatinetDetails = {
        fullName: fullName,
        PhoneNo: PhoneNo,
        age: age
    }
    const PatinetDetailsSend = await userDetails.insertMany([PatinetDetails])
    res.send(PatinetDetailsSend)
})


app.post("/feedback", async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) res.send("plse fill all the details");
    const feedbackData = {
        name: name,
        email: email,
        message: message
    }
    const feedbackDataSend = await userDetails.insertMany([feedbackData])
    res.send(feedbackDataSend)
})






















app.listen(7000, () => {
    console.log("server is running at port 7000");
})