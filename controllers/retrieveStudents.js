import Registration from "../models/registration.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

const RetrieveStudentsController = {
	retrieveStudents: async (req, res) => {
		// begin with only getting students who fulfil the following conditions
		// are registered to the teacher
		// and are not suspended

		const { teacher: teacherEmail, notification } = req.body;

		// Get teacher id
		const teacher = await Teacher.findOne({ email: teacherEmail });
		// get registered students
		const allRegisteredStudents = await Registration.find({
			teacherId: teacher._id,
		});

		// get all non suspended students emails
		const availableStudentEmailPromises = allRegisteredStudents.map(
			async (registration) => {
				const student = await Student.findOne({ _id: registration.studentId });
				if (student && student.isSuspended === false) {
					return student.email;
				}
			}
		);

		const availableStudentEmails = await Promise.all(
			availableStudentEmailPromises
		);

		// remove undefined
		const filteredStudentEmails = availableStudentEmails.filter(
			(email) => email !== undefined
		);

		res.status(200).json({ recipients: filteredStudentEmails });
	},
};

export default RetrieveStudentsController;
