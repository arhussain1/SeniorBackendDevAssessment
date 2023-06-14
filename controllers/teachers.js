import Teacher from "../models/teacher.js";

const TeachersController = {
	getTeacherById: async (req, res) => {
		const { id } = req.params;

		try {
			const teacher = await Teacher.findById(id);

			if (!teacher) {
				return res.status(404).json({ message: "Teacher not found" });
			}

			res.json(teacher);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	createTeacher: async (req, res) => {
		const { email } = req.body;

		try {
			await Teacher.create({ email });

			res.status(201);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

export default TeachersController;
