const express = require("express");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookie.token || req.header.token;

  if (!token) {
    return res.status(400).json({
      status: "failed",
      message: "Token not received. Accessed Denied",
    });
  }
  try {
    const verifyToken = await jwt.verify(token, process.env.SECRETE_KEY);
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
const authAdmin = async (req, res, next) => {
  const token = req.cookies?.token ?? req.headers?.token;
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "token is required. Invalid",
    });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.SECRETE_KEY);
    if (!verifyToken.role.includes("admin")) {
      return res.status(400).json({
        status: "fail",
        message: "Only admin can Access this ",
      });
    }
    req.user = verifyToken;
    next();
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports={
    auth,
    authAdmin
}