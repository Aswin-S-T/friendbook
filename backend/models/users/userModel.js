const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		coverPhoto: { type: String },
		profilePhoto: { type: String },
		about: { type: String },
		followers: [
			{
				followerId: String,
				isFollowingBack: Boolean,
			},
		],
		following: [{ followingId: String, isFollowingBack: Boolean }],
		phone: { type: String, required: true },
		password: { type: String, required: true },
		isActivated: { type: String, default: true },
		isPrivateAccount: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
