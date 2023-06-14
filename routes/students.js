import express from "express";
import StudentsController from "../controllers/students.js";

const router = express.Router();

router.get("/students/:id", StudentsController.getStudentById);
router.post("/students", StudentsController.createStudent);

module.exports = router;

export default router;
