const EmailController = require("../controllers/emailController");

const RouteUser = require("express").Router();

RouteUser.post("/update", EmailController.send);