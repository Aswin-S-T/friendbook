const express = require("express");
const userRouter = require("./routes/users/userRouter");
const postRouter = require("./routes/posts/postRouter");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

// DB configuration
const db = require("./config/db");
db.connect();

// Middlewares

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Routes configurations
app.use("/api/v1/user", userRouter);
app.use("/api/v1/p", postRouter);

app.get("/", (req, res) => {
	res.send("Nodeapp works....");
});

app.listen(port, () => {
	console.log(`Server is running at the port ${port}`);
});
