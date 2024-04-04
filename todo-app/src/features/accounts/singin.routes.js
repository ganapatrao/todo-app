const Express = require("express");
const signinUserController = require("./signin.controller.js");

const signinRouter = Express.Router();

signinRouter.post("/", signinUserController.signinUser);

module.exports = signinRouter;

