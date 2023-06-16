import express from "express";
import RetrieveStudentsController from "../controllers/retrieveStudents.js";

const router = express.Router();

router.post("/", RetrieveStudentsController.retrieveStudents);

export default router;
