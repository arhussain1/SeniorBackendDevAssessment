import express from "express";
import TeachersController from "../controllers/teachers.js";

const router = express.Router();

router.get("/teachers/:id", TeachersController.getTeacherById);
router.post("/teachers", TeachersController.createTeacher);

module.exports = router;

export default router;
