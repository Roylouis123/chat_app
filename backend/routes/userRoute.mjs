import express from "express";
import { getUsersForSidebar } from "../controllers/userController.mjs";
import { ProtectRoute } from "../middleware/protectRoute.mjs";

const router = express.Router();

router.get("/", ProtectRoute, getUsersForSidebar);

export default router;