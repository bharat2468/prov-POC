import { Router } from "express";
import { getAllSchemes } from "../controllers/scheme.controllers.js";

const router = Router();

router.route("/get-all").get(getAllSchemes);

export default router;
