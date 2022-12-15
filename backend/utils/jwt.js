const jwt = require("jsonwebtoken");

module.exports.veryfyJWT = (req, res, next) => {
	const token =
		req.headers["x-access-token"]?.split(" ")[1] ||
		req.headers["authorization"];

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_SECRET || "something_secret",
			(err, decoded) => {
				if (err)
					return res.json({
						isLoggedIn: false,
						message: "Failed to Authenticate",
					});
				req.user = {};
				req.user.id = decoded.id;
				req.user.username = decoded.username;
				next();
			}
		);
	} else {
		res.json({ message: "Token is required" });
	}
};
