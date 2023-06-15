import express from "express";
import CommonStudentsController from "../controllers/commonStudents.js";

const router = express.Router();

router.get("/", CommonStudentsController.getCommonStudents);

export default router;
