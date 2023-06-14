import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	isSuspended: { type: Boolean, default: false },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
