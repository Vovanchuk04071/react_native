import { User } from "../../models";

const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const { HttpCode, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
