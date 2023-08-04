const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/users");
const { HttpCode } = require("./helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
