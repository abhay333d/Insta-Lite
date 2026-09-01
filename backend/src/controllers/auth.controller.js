const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({ username });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "Logged in successfully",
    user: {
      username: user.username,
      id: user._id,
    },
  });
};

module.exports = {
  registerController,
  loginController,
};
