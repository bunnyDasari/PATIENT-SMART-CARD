require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const { userRoute } = require("./usersApi/index")
const { adminRouter } = require("./adminApi/index")


app.use(cors("*"))
app.use(express.json())
app.use("/admin", adminRouter)
app.use("/user", userRoute)
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
