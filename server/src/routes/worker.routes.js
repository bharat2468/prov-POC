import { Router } from "express";
import {addUser,
	registerWorker,
	loginWorker,
	logoutWorker,
	getWorkerDashboard,
    addSchemeToUser,
    getNearestWorker,
    getAllWorkers,
    getWorkerById,
    getWorkerUsers} from "../controllers/worker.controllers.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyWorkerJWT } from "../middlewares/workerAuth.middleware.js";
import { isAdmin } from "../middlewares/admin.midleware.js";

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

router.route("/get-users").get(verifyWorkerJWT,getWorkerUsers);

router.route("/get-all-workers").get(verifyWorkerJWT,isAdmin,getAllWorkers);

router.route("/get-worker/:id").get(verifyWorkerJWT,getWorkerById);

export default router;
