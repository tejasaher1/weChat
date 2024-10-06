const express = require("express");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.sign_in = async (req, res) => {
  try {
    const user = await userModel.findOne({ Email: req.body.Email });
    if (!user) {
      console.log("Email or Password is wrong ");
      return res
        .status(403)
        .json({ message: "Email or Password is wrong", success: false });
    }

    const checkPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!checkPassword) {
      console.log("Email or Password is wrong ");
      return res
        .status(403)
        .json({ message: "Email or Password is wrong", success: false });
    }

    const jwtToken = jwt.sign(
      { Email: user.Email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30h" }
    );

    res
      .status(200)
      .json({
        message: "Loggin Successful",
        jwtToken,
        data: user,
        success: true,
      });
  } catch (error) {
    console.log("Error in user login- ", error);
    res.status(400).json({ message: "Error in user login", success: false });
  }
};

module.exports.registartion = async (req, res) => {
  try {
    if (req.body.Password != req.body.Confirmpassword) {
      return res
        .status(400)
        .json({
          message: "Password and confirm password did not match",
          success: false,
        });
    }

    const user = await userModel.findOne({ Email: req.body.Email });
    if (user) {
      console.log("Email already exist- ");
      return res
        .status(409)
        .json({ message: "Email already exist.", success: false });
    }

    const newuser = new userModel(req.body);
    newuser.Password = await bcrypt.hash(req.body.Password, 10);
    await newuser.save();
    res
      .status(200)
      .json({
        message: "Form data received successfully",
        data: newuser,
        success: true,
      });
  } catch (error) {
    console.log("Error in user registartion- ", error);
    res
      .status(400)
      .json({ message: "Error in user registartion-", success: false });
  }
};

module.exports.getUserData = async (req, res) => {
  const userId = req.headers["user-id"];
  let data = null;
  try {
    data = await userModel.findOne({ _id: userId });
  } catch (error) {
    console.log("Error in fetching data ", error);
    res.status(400).json({ message: "Error in fetching data", success: false });
  }

  fetchData = {
    Firstname: data.Firstname,
    Lastname: data.Lastname,
    Email: data.Email,
  };
  return res.status(200).json({ success: true, fetchData });
};


module.exports.allUsers = async (req, res) => {
  
  const keyword = req.query.search
    // ? {
    //     $or: [
    //       { Firstname: { $regex: req.query.search, $options: "i" } },
    //       { Lastname: { $regex: req.query.search, $options: "i" } },
    //       { Email: { $regex: req.query.search, $options: "i" } },
    //     ],
    //   }
    // : {};


    ? {
        $or: [
          // Check for individual matches in Firstname, Lastname, and Email
          { Firstname: { $regex: req.query.search, $options: "i" } },
          { Lastname: { $regex: req.query.search, $options: "i" } },
          { Email: { $regex: req.query.search, $options: "i" } },
  
          // Handle case where Firstname and Lastname are combined
          ...(req.query.search.includes(' ')
            ? (() => {
                const nameParts = req.query.search.split(' ').filter(Boolean);
                return [
                  {
                    $and: [
                      { Firstname: { $regex: nameParts[0], $options: "i" } },
                      { Lastname: { $regex: nameParts[1], $options: "i" } }
                    ]
                  }
                ];
              })()
            : [])
        ]
      }
    : {};

  const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};
