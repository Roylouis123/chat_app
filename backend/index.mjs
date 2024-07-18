import express from 'express'
import authRoutes from "./routes/authRoute.mjs"
import messageRoutes from "./routes/messageRoute.mjs"
import userRoutes from "./routes/userRoute.mjs"
import { ConnectMongoDB } from './db/connectMongoDb.mjs'
import dotenv from 'dotenv'
import bodyParser from 'cookie-parser'

const app = express()

dotenv.config();

app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser())


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.listen(5000,()=>{
    ConnectMongoDB()
    console.log("Listening on port 5000")
})