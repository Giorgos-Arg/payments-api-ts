import express from "express";
const router = express.Router();
import userController from "../controllers/userController";

router.post("/authenticate", userController.authenticate);
router.post("/signup", userController.signUp);

export default router;
