const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const salt = +process.env.salt;
const nodemailer = require("nodemailer");
const { UserModel } = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const userexists = await UserModel.findOne({ email });

    if (userexists) {
      return res
        .status(409)
        .send({ message: "User already exists , Please Login" });
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ Error: err });
      } else {
        const user = await new UserModel({
          name,
          email,
          password: hash,
        });
        user.save();
        

        res.status(201).send({ message: "User registered sucessfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User dosen't exists, Please Signup" });
    } else if (user.verified === false) {
      return res.status(401).send({ message: "Please verifiy your email" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ Error: err });
        }

        if (result) {
          const UserId = user._id;
          const name = user.name;
          const token = jwt.sign(
            { UserId, name, email },
            process.env.Tokensecret,
            { expiresIn: 60 * 60 * 24 * 7 }
          );
          res.cookie("token", token);
          res.status(201).send({ message: "Login Sucessful", token });
        } else {
          res
            .status(401)
            .send({ message: "Incorrect credentials , Please login again" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Something went wrong" });
  }
};
