require('dotenv').config()
const { Router } = require("express")
const userRoute = Router()
const { userDetails, userSignData, otpModel } = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const serectkey = process.env.serectkey
userRoute.get("/", async (req, res) => {
    const userData = await userDetails.find({});
    res.json(userData);
})

userRoute.post("/login", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) res.send("fill the login details");
    const userLoginData = await userSignData.findOne({ username: username })

    // console.log(userLoginData)
    if (userLoginData) {
        const token = jwt.sign({
            token: userLoginData._id
        }, serectkey)
        res.json({
            token: token
        })
    } else {
        res.send(userLoginData).status(200)
    }


})
userRoute.post("/signup", async (req, res) => {
    const { username, password } = req.body
    const checkUserExists = await userSignData.find({ username })
    console.log(checkUserExists)
    if (checkUserExists.length > 0) {
        res.json({
            msg: "Username alredy exsist"
        })
    } else {
        const hasedpassword = await bcrypt.hash(password, 10)
        await userSignData.create({ username, password: hasedpassword })
        res.json({
            msg: "user created login!!"
        })
    }
})
userRoute.post('/user-details', async (req, res) => {
    const { fullName, age, PhoneNo, email, BloodGroup, HealthHis, doctorId } = req.body
    const token = req.headers.token
    const userId = jwt.verify(token, serectkey)
    const otp = await otpModel.findOne({ email: email })
    if (otp) {
        res.json({ msg: 'verify the email' })
    } else {
        const userData = await userDetails.create({
            userId: userId.token,
            fullName: fullName,
            age: age,
            PhoneNo: PhoneNo,
            email: email,
            BloodGroup: BloodGroup,
            HealthHis: HealthHis,
            doctor: doctorId
        })
        res.json({ userData })
    }
    console.log(userId)
});
userRoute.get("/userData", async (req, res) => {
    const token = req.headers.token
    try {
        const user = jwt.verify(token, serectkey)
        const userFind = await userDetails.findOne({ userId: user.token })
        res.json({ userFind })
        console.log(userFind)
    } catch (error) {
        console.log(error)
    }
})
userRoute.post("/paitantDetails", async (req, res) => {

})


userRoute.post("/feedback", async (req, res) => {
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


userRoute.post("/appoinment", async (req, res) => {
    const { name, email, date, time, service, message } = req.body
    if (!name || !email || !date || !time || !service || !message) res.send("please fill all the details").status(400)
    const appoinmentData = {
        name: name,
        email: email,
        date: date,
        time: time,
        service: service,
        message: message
    }
    const appoinmentDataSend = await userDetails.insertMany([appoinmentData])
    res.send(appoinmentDataSend).status(200)
})


userRoute.get("/admin-check", async function (req, res) {
    const { username } = req.body
    try {
        const userAdminDetials = await userDetails.findOne({ fullName: username })
        res.json({
            user: userAdminDetials
        })
    } catch (error) {
        console.log(error)
    }
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Send OTP
userRoute.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await otpModel.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
    });

    try {
        await transporter.sendMail({
            from: `"OTP Verification" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `<p>Your OTP is: <b>${otp}</b>. It expires in 5 minutes.</p>`,
        });
        console.log(otpStore)
        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error });
    }
});
// ✅ Verify OTP
userRoute.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    const record = await otpModel.findOne({ email })
    console.log(record)
    if (!record) {
        return res.status(400).json({ message: "No OTP sent to this email." });
    }

    if (Date.now() > record.expires) {
        await otpModel.deleteMany({ email });
        return res.status(400).json({ message: "OTP expired." });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP." });
    }

    await otpModel.deleteMany({ email });
    res.status(200).json({ message: "OTP verified successfully!" });
});

module.exports = { userRoute }