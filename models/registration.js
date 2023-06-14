import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
	teacherId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Teacher",
		required: true,
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
});

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;
