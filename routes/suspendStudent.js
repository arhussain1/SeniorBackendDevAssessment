import express from "express";
import SuspendStudentController from "../controllers/suspendStudent.js";

const router = express.Router();

router.post("/", SuspendStudentController.suspendStudent);

export default router;
