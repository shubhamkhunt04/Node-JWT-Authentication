const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const generateToken = require("../utils/generateToken").generateToken;

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: async (req, res) => {
    let result = {};
    const { name, password } = req.body;
    const newUser = new User({ name, password });
    try {
      const saveUser = await newUser.save();
      result.user = saveUser;
      res.send(result);
    } catch (error) {
      result.error = "User already exist";
      res.send(result);
    }
  },

  login: async (req, res) => {
    let result = {};
    try {
      const { name, password } = await req.body;
      const user = await User.findOne({ name });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        // match ? (result.user = user) : (result.error = "Authentication error");

        if (match) {
          const token = generateToken(user.id);
          result.token = token;
          result.user = user;
        } else {
          result.error = "Athentication erro :) Invalid credential";
        }
      } else {
        result.error = "User does not exist";
      }
      res.send(result);
    } catch (error) {
      console.log(error);
      result.error = error;
      res.send(result);
    }
  },

  getAllUsers: async (req, res) => {
    let result = {};
    try {
      const users = await User.find({});
      if (users) {
        result.users = users;
      }
      res.send(result);
    } catch (error) {
      result.error = error;
      res.send(result);
    }
  },
};
