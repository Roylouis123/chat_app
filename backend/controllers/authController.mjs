import userModel from "../model/userModel.mjs";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/generateJwtToken.mjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)

    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const userEmail = await userModel.findOne({ email });

    if (userEmail) {
      return res.status(400).send("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: userPassword,
    });

    if (!user) {
      return res.status(400).send("Something went wrong");
    }

    const token = generateJwtToken(user._id, user.email);

    res.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    console.log("User signed up successfully");
  } catch (error) {
    throw error;
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid password");
      } else {
        const token = generateJwtToken(user._id, user.email);
        res.cookie("token", token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } 
    }
  } catch (error) {
    console.log("Error while logging in", error);
  } 
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error while logging out", error);
  }
};


export const checkAuth = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error while checking authentication", error);
  }
}
