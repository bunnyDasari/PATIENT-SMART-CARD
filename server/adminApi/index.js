require('dotenv').config()
const { Router } = require("express")
const { adminSignDetails, userDetails } = require("../db")
const adminRouter = Router()
const jwt = require("jsonwebtoken")
const adminSecKey = process.env.adminSec

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

module.exports = { adminRouter }