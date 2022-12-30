const express = require("express");
const userController = require("../../controllers/users/userController");
const User = require("../../models/users/userModel");
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
	const { email, password } = loginData;
	if (email == null || password == null) {
		res.send("Email and password required");
	} else {
		userController.login(loginData).then((response) => {
			res.send(response);
		});
	}
});

userRouter.get("/getUsername", veryfyJWT, (req, res) => {
	res.json({ isLoggedIn: true, username: req.user.username });
});

userRouter.get("/get-user/:userId", async (req, res) => {
	const uid = req.params.userId;
	const userDetails = await User.findOne({ _id: uid });
	let response = {};
	if (userDetails) {
		response.code = 200;
		response.status = "success";
		response.data = userDetails;
	} else {
		response.code = 404;
		response.status = "failed";
		response.data = null;
	}

	res.send(response);
});

userRouter.post("/edit-profile", veryfyJWT, async (req, res) => {
	const userId = req.user.id;
	let user = await User.findOne({ _id: userId });
	let response = {};
	if (user) {
		let updatedData = await User.updateOne({ _id: userId }, { $set: req.body });
		if (updatedData.modifiedCount == 1) {
			response.code = 200;
			response.status = "success";
			response.data = updatedData;
		}
	}

	res.send(response);
});

userRouter.get("/all-users", veryfyJWT, async (req, res) => {
	const users = await User.find();
	let response = {};
	if (users) {
		for (let i = 0; i < users.length; i++) {
			const e = users[i];
			if (!e.profilePhoto) {
				users[i].profilePhoto =
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yJmOL8nb6x7NO2xuLB-Cc1qP2MRFdq24qg&usqp=CAU";
			}
		}
		response.code = 200;
		response.status = "success";
		response.data = users;
	} else {
		response.code = 404;
		response.status = "failed";
		response.data = null;
	}
	res.send(response);
});

module.exports = userRouter;
