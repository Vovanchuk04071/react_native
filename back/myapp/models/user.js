const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usersSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: [true, "Email is require"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Set password for user"],
    minlength: 6,
  },
  token: String,
  avatarURL: {
    type: String,
    require: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const User = model("users", usersSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
