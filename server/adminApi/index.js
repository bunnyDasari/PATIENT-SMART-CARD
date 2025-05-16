require('dotenv').config()
const { Router } = require("express")
const { adminSignDetails, userDetails } = require("../db")
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


module.exports = { adminRouter }