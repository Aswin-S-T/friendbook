const express = require("express");
const { verify } = require("jsonwebtoken");
const { post } = require("../../data/post/sampleData");
const Post = require("../../models/post/postModel");
const User = require("../../models/users/userModel");
const { cloudinary } = require("../../utils/cloudinary");
const postRouter = express.Router();
const { veryfyJWT } = require("../../utils/jwt");

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
	const post = await Post.find().sort({ postedTime: -1 });
	let postDetais;
	let postObj = {};
	let postArr = [];
	if (post) {
		for (let i = 0; i < post.length; i++) {
			let e = post[i];
			const user = await User.findOne({ _id: e.userId });
			e = e._doc;
			delete e.createdAt;
			delete e.updatedAt;
			delete e.__v;
			postObj = { ...e, username: user["username"] };
			postArr.push(postObj);
		}
	}

	response.code = 200;
	response.status = "success";
	response.data = postArr;
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

postRouter.get("/images", async (req, res) => {
	const { resources } = await cloudinary.search
		.expression("folder: cloudinary_react")
		.sort_by("public_id", "desc")
		.max_results(30)
		.execute();
	const publicIds = resources.map((file) => file.public_id);
	res.send(publicIds);
});

postRouter.post("/add-my-post", veryfyJWT, async (req, res) => {
	const userData = req.user;
	let response = {};
	let postData = {
		userId: userData.id,
		imageUrl: "",
		postedTime: new Date().valueOf(),
	};
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "cloudinary_react",
		});
		postData["imageUrl"] = uploadResponse.url;
		await Post.create(postData).then((result) => {
			response.code = 200;
			response.success = true;
			response.data = result;
		});
	} catch (error) {
		response.code = 500;
		response.success = false;
		response.data = null;
	}
	res.send(response);
});

postRouter.post("/like-post/:postId", veryfyJWT, async (req, res) => {
	const userDetails = req.user;
	const postDetails = await Post.findByIdAndUpdate(
		{ _id: req.params.postId },
		{ $push: { likeCount: employee._id } },
		{ new: true, upsert: true }
	);
	console.log(userDetails);
	console.log(postDetails);
});

module.exports = postRouter;
