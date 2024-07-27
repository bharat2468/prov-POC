import { Router } from "express";
import {addUser,
	registerWorker,
	loginWorker,
	logoutWorker,
	getWorkerDashboard,
    addSchemeToUser,
    
    getNearestWorker} from "../controllers/worker.controllers.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyWorkerJWT } from "../middlewares/workerAuth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/add-user").post(verifyWorkerJWT,addUser);

router
	.route("/register")
	.post(upload.single("avatar"), registerWorker);

router.route("/login").post(loginWorker);

router.route("/logout").post(verifyWorkerJWT,logoutWorker);

router.route("/get-dashboard").get(verifyWorkerJWT,getWorkerDashboard);

router.route("/get-nearest").get(getNearestWorker);

router.route("/add-scheme").post(addSchemeToUser)

export default router;
