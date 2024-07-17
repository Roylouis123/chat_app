import express from 'express'
import { sendMessage } from '../controllers/messageController.mjs'
import { ProtectRoute } from '../middleware/protectRoute.mjs'

const route = express.Router()

route.post("/send/:id",ProtectRoute,sendMessage)


export default route