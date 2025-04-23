import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Register
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPass,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// User Login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "1d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAlluser

export const userDetails = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};


// specific user profile

export const userProfile =async (req,res)=>{
  const user = req.user
  res.status(201).json({
    success:true,
    message:"user profile ",
    user
  })
}