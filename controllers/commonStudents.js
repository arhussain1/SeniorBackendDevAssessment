import Registration from "../models/registration.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

const CommonStudentsController = {
	getCommonStudents: async (req, res) => {
		const teacherEmails = req.query.teacher;

		// there can be more than one teacher email
		// we are after the intersection between all teacher emails i.e. common

		const teachers = await Teacher.find({ email: { $in: teacherEmails } });

		const teacherIds = teachers.map((teacher) => teacher._id);

		if (!teacherIds) {
			// return early with no teachers found with those emails
		}

		// now lets run a search over our Registration collection
		// So happy I went for this approach
		// const registrations = await Registration.find({
		// 	teacherId: { $in: teacherIds },
		// });
		const studentIdsArrays = await Promise.all(
			teacherIds.map(async (teacherId) => {
				const registrations = await Registration.find({ teacherId });
				return registrations.map((registration) => registration.studentId);
			})
		);

		const commonStudentIds = studentIdsArrays.reduce((prev, curr) => {
			// So looking online and something I learned today at work Hashmaps are perfect for
			// this problem
			// you can either do this using includes method(inefficient) or using a Set and the has() method
			// I had to convert to string because comparisons between mongo ObjectIds don't work
			const set = new Set(curr.map((mongoId) => mongoId.toString()));

			return prev.filter((studentId) => set.has(studentId.toString()));
		});

		const students = await Student.find(
			{ _id: { $in: commonStudentIds } },
			"email"
		);

		const commonStudentEmails = students.map((student) => student.email);

		res.json({ students: commonStudentEmails });
	},
};

export default CommonStudentsController;
