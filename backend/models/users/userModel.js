const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		password: { type: String, required: true },
		isActivated: { type: String, default: true },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
