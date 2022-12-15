const mongoose = require("mongoose");
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/crowdly_v2";
mongoose.set("strictQuery", true);

module.exports.connect = () => {
	mongoose.connect(
		dbUrl,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) throw err;
			console.log("Mongodb connected successfully....");
		}
	);
};
