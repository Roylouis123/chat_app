import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageController.mjs'
import { ProtectRoute } from '../middleware/protectRoute.mjs'

const route = express.Router()

route.post("/send/:id",ProtectRoute, sendMessage);
route.get("/:id", ProtectRoute, getMessages);


export default route