require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const { userRoute } = require("./usersApi/index")
const { adminRouter } = require("./adminApi/index")

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute // 15 minutes
  max: 5, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
})

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(limiter);
app.use(express.json())
app.use("/admin", limiter, adminRouter)
app.use("/user", userRoute)
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
})
