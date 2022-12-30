const express = require("express");
const { post } = require("../../data/post/sampleData");
const Post = require("../../models/post/postModel");
const { cloudinary } = require("../../utils/cloudinary");
const postRouter = express.Router();

postRouter.get("/", (req, res) => {
	res.send("post router called");
});

// postRouter.post("/add-post", async (req, res) => {
// 	const createdPost = await Post.create(post);
// 	console.log(createdPost);
// 	res.send("add post called");
// });

postRouter.get("/get-all-post", async (req, res) => {
	const response = {};
	const post = await Post.find();
	response.code = 200;
	response.status = "success";
	response.data = post;
	res.send(response);
});

postRouter.post("/add-post", async (req, res) => {
	console.log("hello");
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "cloudinary_react",
		});
		console.log("uploadResponse : ", uploadResponse.url);
		res.json({ msg: "File uploaded successfully...." });
	} catch (error) {
		console.log("Erro : ", error);
		res.status(500).json({ err: "Something went wrong" });
	}
});

module.exports = postRouter;
