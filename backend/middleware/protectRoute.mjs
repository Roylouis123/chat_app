import userModel from "../model/userModel.mjs";
import jwt from "jsonwebtoken";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) throw new Error("Unauthorized: Invalid User");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error while checking authentication:", error?.message);
    return res.status(401).json({ error: error?.message });
  }
};


