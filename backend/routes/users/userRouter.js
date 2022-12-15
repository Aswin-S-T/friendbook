const express = require("express");
const userController = require("../../controllers/users/userController");
const { veryfyJWT } = require("../../utils/jwt");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	res.send("user router called");
});

userRouter.post("/register", async (req, res) => {
	let userData = req.body;
	userController.register(userData).then((response) => {
		res.send(response);
	});
});

userRouter.post("/login", (req, res) => {
	let loginData = req.body;
	userController.login(loginData).then((response) => {
		res.send(response);
	});
});

userRouter.get("/getUsername", veryfyJWT, (req, res) => {
	res.json({ isLoggedIn: true, username: req.user.username });
});

module.exports = userRouter;
