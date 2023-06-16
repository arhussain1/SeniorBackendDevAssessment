import Registration from "../models/registration.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

const extractMentionedEmails = (notificationText) => {
	// maybe consider some regex
	// Note I found this online I am not a regex dude but I did pick it
	// apart in regex101
	const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/g;
	const emails = notificationText.match(emailRegex);
	return emails;
};

const RetrieveStudentsController = {
	retrieveStudents: async (req, res) => {
		// Complete this solution by adding the ability to detect @mentions
		// conditions:
		// are registered to the teacher
		// and are not suspended
		// include emails of @mentions students

		// add a function to accept notifiction and return List of emails from @mentions

		const { teacher: teacherEmail, notification } = req.body;

		// this student map will handle ensuring unique values for students
		const studentsMap = new Map();

		// Get teacher id
		const teacher = await Teacher.findOne({ email: teacherEmail });

		// get teachers registered students
		const registrations = await Registration.find({
			teacherId: teacher._id,
		});

		// Add all student emails and their suspension status to the student map
		await Promise.all(
			registrations.map(async (registration) => {
				const student = await Student.findOne({ _id: registration.studentId });
				studentsMap.set(student.email, student.isSuspended);
			})
		);

		// have some function that extracts @mention emails
		const extractedEmails = extractMentionedEmails(notification);

		// search Students for those emails and add them to the map
		await Promise.all(
			extractedEmails.map(async (email) => {
				const student = await Student.findOne({ email });
				// if the student is not already in the map add them
				if (!studentsMap.has(student.email)) {
					studentsMap.set(student.email, student.isSuspended);
				}
			})
		);

		// return available students array
		let availableStudents = new Array();

		studentsMap.forEach((isSuspended, email) => {
			console.log(isSuspended, email);
			if (isSuspended === false) availableStudents.push(email);
		});

		res.status(200).json({ recipients: availableStudents });
	},
};

export default RetrieveStudentsController;
