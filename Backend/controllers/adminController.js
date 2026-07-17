const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAdmin = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required!!",
      });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists!!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "admin",
    });
    await newAdmin.save();
    return res.status(201).json({
      message: "Admin created successfully!!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!!",
      });
    }
    const adminData = await Admin.findOne({ email, role: "admin" });
    if (!adminData) {
      return res.status(404).json({
        message: "Admin not Found",
      });
    }
    const correctPassword = await bcrypt.compare(password, adminData.password);
    if (!correctPassword) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign({
      id: adminData._id,
      role: adminData.role
    },
  process.env.JWT_SECRET,
  {
expiresIn:"7d"
  }
  );
    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  adminLogin,
  createAdmin,
};
