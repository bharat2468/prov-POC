import { Router } from "express";
import {
    allComments, createComment, updateComment, deleteComment
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.midleware.js";

const router = Router();

router.route("/all-comments").get(verifyJWT,isAdmin, allComments);

router.route("/create").post(verifyJWT, createComment);

router.route("/update/:commentId").patch(verifyJWT, updateComment);

router.route("/delete/:commentId").delete(verifyJWT, deleteComment);

export default router;
