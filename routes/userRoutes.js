const EmailController = require("../controllers/emailController");
const UserController = require("../controllers/userController");
const RouteUser = require("express").Router();

RouteUser.post("/update", UserController.update);
RouteUser.get("/", UserController.get);
RouteUser.post("/getOne", UserController.getOneUser);
RouteUser.post("/getUserByID", UserController.getUserbyID);
RouteUser.post("/getUserEmail", UserController.getOneUserEmail, EmailController.send);
// RouteUser.post("/login", AccountController.login);



module.exports = RouteUser;
