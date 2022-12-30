const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		imageUrl: { type: String },
		likeCount: { type: Number, default: 0, likedIds: [] },
		comments: {
			type: Number,
			default: 0,
			commentedIds: [{ id: "", comment: "" }],
		},
		share: { type: Number, default: 0, sharedIds: [{ id: "" }] },
		postedTime: { type: String },
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
