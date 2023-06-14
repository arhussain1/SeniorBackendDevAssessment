import Student from "../models/student.js";

const StudentsController = {
	getStudentById: async (req, res) => {
		const { id } = req.params;

		try {
			const student = await Student.findById(id);

			if (!student) {
				return res.status(404).json({ message: "Student not found" });
			}

			res.json(student);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	createStudent: async (req, res) => {
		const { email } = req.body;

		try {
			await Student.create({ email });

			res.status(201);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

export default StudentsController;
