import express from 'express'
import { checkAuth, login, logout, signUp } from '../controllers/authController.mjs'
import { ProtectRoute } from '../middleware/protectRoute.mjs'

const route = express.Router()

route.post("/signUp",signUp)
route.post("/login",login)
route.delete("/logout",logout)
route.get('/checkauth',ProtectRoute,checkAuth)


export default route