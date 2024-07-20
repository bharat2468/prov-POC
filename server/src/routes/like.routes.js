import { Router } from "express";
import {
    likePost,likeComment,deleteLike
} from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/post/:postId").post(verifyJWT, likePost);

router.route("/comment/:commentId").post(verifyJWT, likeComment);

router.route("/delete/:likeId").delete(verifyJWT, deleteLike);

export default router;
