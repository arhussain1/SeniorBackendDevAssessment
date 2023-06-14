import express from "express";
import RegisterController from "../controllers/register.js";

const router = express.Router();

router.post("/", RegisterController.registerStudents);

export default router;
