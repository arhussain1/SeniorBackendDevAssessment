import Registration from "../models/registration.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

const RegisterController = {
	registerStudents: async (req, res) => {
		try {
			const { teacher: teacherEmail, students: studentEmails } = req.body;

			// check to see if the teacher exists if not create them
			const foundTeacher = await Teacher.findOne({ email: teacherEmail });
			let teacherId;
			if (foundTeacher) {
				teacherId = foundTeacher._id;
			} else {
				const createdTeacher = await Teacher.create({ email: teacherEmail });
				teacherId = createdTeacher._id;
			}

			// do the same for each student
			// Just noticed each iteration is returning a promise, we need
			// to ensure we A name it accordingly and B ensure all promises are
			// awaited
			const studentPromises = studentEmails.map(async (studentEmail) => {
				const foundStudent = await Student.findOne({ email: studentEmail });
				if (foundStudent) {
					return foundStudent._id;
				} else {
					const createdStudent = await Student.create({ email: studentEmail });
					return createdStudent._id;
				}
			});
			const studentIds = await Promise.all(studentPromises);

			// Create the required registrations for each student
			// NOTE we are mapping promises again

			const registrationPromises = studentIds.map(async (studentId) => {
				const registration = await Registration.create({
					teacherId: teacherId,
					studentId: studentId,
				});

				return registration;
			});
			await Promise.all(registrationPromises);

			res.sendStatus(204);
		} catch (error) {
			res
				.status(500)
				.json({
					message: "An error occurred while registering students.",
					error: error.message,
				});
		}
	},
};

export default RegisterController;
