const { Router } = require("express")
const { adminSignDetails, userDetails } = require("../db")
const adminRouter = Router()
const jwt = require("jsonwebtoken")
const adminSecKey = process.env.adminSecKey
adminRouter.post("/login", async (req, res) => {
    const { username, password } = req.body
    const userCheck = await adminSignDetails.findOne({ username })
    try {
        if (userCheck) {
            const token = jwt.sign({
                token: userCheck._id
            }, adminSecKey)
            res.json({
                token: token
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
    const userId = jwt.verify(token, adminSecKey)
    const paitantData = await userDetails.find({ doctor: userId.token })
    res.json({
        paitantData
    })
})



module.exports = { adminRouter }