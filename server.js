import express, { json } from "express";
import mongoose from "mongoose";
import RegistrationRouter from "./routes/register.js";
import CommonStudentsRouter from "./routes/commonStudents.js";

const app = express();
const PORT = 3000;

app.use(json());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// connect to a local mongo db
mongoose
	.connect("mongodb://localhost:27017/mydatabase", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));

// Create our first route
app.get("/", (req, res) => {
	res.send("Hello HOPE");
});
app.use("/register", RegistrationRouter);
app.use("/commonstudents", CommonStudentsRouter);
