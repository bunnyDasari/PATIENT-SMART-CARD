require('dotenv').config()
const { Router } = require("express")
const nodemailer = require("nodemailer");
const { adminSignDetails, userDetails, otpModel } = require("../db")
const adminRouter = Router()
const jwt = require("jsonwebtoken")
const OpenAI = require("openai");
const adminSecKey = process.env.adminSec

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

adminRouter.post("/login", async (req, res) => {
    const { username, password } = req.body
    const userCheck = await adminSignDetails.findOne({ username })
    try {
        if (userCheck) {
            const token = jwt.sign({
                token: userCheck._id
            }, adminSecKey)
            res.json({
                token: token,
                user: userCheck.username
            })
        } else {
            res.json({ msg: "signup...!!!!" })
        }
    } catch (error) {
        res.json({ msg: error })
    }
})

adminRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body
    const userFind = await adminSignDetails.findOne({ username })
    if (userFind) {
        res.json({ msg: "username is alredy exsist" })
    } else {
        await adminSignDetails.create({
            username: username,
            password: password
        })
        res.json({
            msg: "user created successfully"
        })
    }

})

adminRouter.get("/user-Details", async (req, res) => {
    const token = req.headers.token
    console.log(token)
    try {
        const userId = jwt.verify(token, adminSecKey)
        console.log(userId)
        const paitantData = await userDetails.find({ doctor: userId.token })
        res.json({
            paitantData
        })
    } catch (error) {
        console.log(error)
    }
})


adminRouter.post("/ai/healthtips", async (req, res) => {
    try {
        const { age, gender, conditions } = req.body;

        const prompt = `
      A ${age}-year-old ${gender} patient has conditions: ${conditions}.
      Suggest 5 personalized health tips related to lifestyle, diet, and regular checkups.
      `;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a healthcare assistant." },
                { role: "user", content: prompt },
            ],
        });

        res.json({ tips: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});






const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Send OTP
adminRouter.post("/send-otp", async (req, res) => {
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
        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error });
    }
});

// ✅ Verify OTP
adminRouter.post("/verify-otp", async (req, res) => {
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
module.exports = { adminRouter }