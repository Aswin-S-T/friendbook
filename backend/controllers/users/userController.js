const User = require("../../models/users/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
	register: (userData) => {
		return new Promise(async (resolve, reject) => {
			let { username, name, email, phone, password } = userData;
			let response = {};
			let userExists = await User.findOne({ username, phone, email });
			if (userExists) {
				response.code = 409;
				response.message = "User already exists";
				response.data = null;
			} else {
				let hashedPassword = await bcrypt.hash(password, 10);
				const dbUser = new User({
					username,
					name,
					email: email.toLowerCase(),
					phone,
					password: hashedPassword,
				});
				dbUser.save();
				response.code = 200;
				response.message = "success";
			}
			resolve(response);
		});
	},
	login: (userData) => {
		return new Promise(async (resolve, reject) => {
			let { email, password } = userData;
			let response = {};
			await User.findOne({ email: email }).then(async (user) => {
				if (!user) {
					response.code = 404;
					response.message = "Account Not Found";
				}
				await bcrypt.compare(password, user.password).then((isSame) => {
					if (!isSame) {
						response.code = 403;
						response.message = "Invalid Credantials";
						resolve(response);
					} else {
						const payload = {
							id: user._id,
							username: user.username,
						};
						jwt.sign(
							payload,
							process.env.JWT_SECRET || "something_secret",
							{
								expiresIn: "30d",
							},
							(err, token) => {
								if (err) {
									response.message = "Error";
								} else {
									response.code = 200;
									response.message = "success";
									response.data = "Bearer " + token;
									resolve(response);
								}
							}
						);
					}
				});
			});
		});
	},
};
