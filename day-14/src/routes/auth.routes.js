const express = require("express");
const authRouter = express.Router();
const UserModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await UserModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const newUser = await UserModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.cookie("token", token)

  res.status(201).json({ message: "User registered successfully", user: {
    name: newUser.name,
    email: newUser.email,
  }, token });

  
});

authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    res.json({ user: {
        name: user.name,
        email: user.email,
    } });
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user  = await UserModel.findOne({ email });

    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordValid = hash === user.password;

    if(!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      res.cookie("token", token)
      res.json({ message: "Login successful", user: {
        name: user.name,
        email: user.email,
    }, token });
});
     

module.exports = authRouter;
