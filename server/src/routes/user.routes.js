import { Router } from "express";
import {
	changeExistingPassword,
	getUser,
	loginUser,
	logoutUser,
	refreshAccessToken,
	registerUser,
	updateUserFields,
	updateAvatar,
	deleteUser,
	allUsers,
	googleAuthHandler,
	adminDeleteUser,
	getUserSchemes,
} from "../controllers/user.controllers.js";
import { approvedWorkers,notApprovedWorkers } from "../controllers/worker.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
	registrationSchema,
	loginSchema,
	updateUserSchema,
	changePasswordSchema,
} from "../utils/validators.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { isAdmin } from "../middlewares/admin.midleware.js";
import { verifyWorkerJWT } from "../middlewares/workerAuth.middleware.js";

const router = Router();

router
	.route("/register")
	.post(upload.single("avatar"), validate(registrationSchema), registerUser);

router.route("/login").post(validate(loginSchema), loginUser);

router.route("/logout").post(verifyJWT, logoutUser);	

router.route("/google").post(googleAuthHandler);

router.route("/delete").delete(verifyJWT,deleteUser)

router.route("/admin-delete/:userId").delete(verifyJWT,isAdmin,adminDeleteUser);

router.route('/all-users').get(verifyJWT,isAdmin,allUsers);

router.route("/generate-token").post(refreshAccessToken);

router
	.route("/change-password")
	.post(verifyJWT, validate(changePasswordSchema), changeExistingPassword);

router.route("/get-user").get(verifyJWT, getUser);

router
	.route("/update-user-details")
	.patch(verifyJWT, validate(updateUserSchema), updateUserFields);

router
	.route("/update-avatar")
	.patch(verifyJWT, upload.single("avatar"), updateAvatar);


router.route("/approved").get(verifyJWT,isAdmin,approvedWorkers);

router.route("/not-approved").get(verifyJWT,isAdmin,notApprovedWorkers)

router.route("/user-schemes/:id").get(verifyWorkerJWT,getUserSchemes);

export default router;


