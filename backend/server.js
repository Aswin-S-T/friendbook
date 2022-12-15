const express = require("express");
const userRouter = require("./routes/users/userRouter");
const app = express();

const port = process.env.PORT || 5000;

// DB configuration
const db = require("./config/db");
db.connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configurations
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
	res.send("Nodeapp works....");
});

app.listen(port, () => {
	console.log(`Server is running at the port ${port}`);
});
