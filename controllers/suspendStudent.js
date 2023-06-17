import Student from "../models/student.js";

const SuspendStudentController = {
	suspendStudent: async (req, res) => {
		// This endpoint will need to suspend a single student
		// it accepts a json object of "student" it is their email
		//
		// From initial looks there is no way to verify the request
		// I would have liked a teacher email to be passed through as well
		// then run a look up via registrations and verify the teacher is related
		// to the student then process the suspension request

		try {
			const { student: studentEmail } = req.body;

			await Student.findOneAndUpdate(
				{ email: studentEmail },
				{ isSuspended: true }
			);

			res.sendStatus(204);
		} catch (error) {
			res
				.status(500)
				.json({
					message: "An error occurred while suspending the student.",
					error: error.message,
				});
		}
	},
};

export default SuspendStudentController;
