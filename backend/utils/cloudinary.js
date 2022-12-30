const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME || "personalprojectaswins",
	api_key: "343244986796635",
	api_secret: "sEVNeeKFS57c0udTcVgbNdY8nuk",
});

module.exports = { cloudinary };
