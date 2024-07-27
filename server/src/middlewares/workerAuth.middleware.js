import { Worker } from "../models/worker.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyWorkerJWT = asyncHandler(async (req, _, next) => {
	try {
		// Extract token from cookies or Authorization header
		const token =
			req.cookies.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		try {
			// Verify the token
			const decodedWorker = jwt.verify(
				token,
				process.env.ACCESS_TOKEN_SECRET
			);

			// Find the worker by ID
			const worker = await Worker.findById(decodedWorker._id).select(
				"-password -refreshToken"
			);

			if (!worker) {
				throw new ApiError(401, "Invalid Access Token");
			}

			// Attach worker to the request object
			req.worker = worker;
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				throw new ApiError(401, "JWT expired");
			}
			throw error;
		}
	} catch (error) {
		next(new ApiError(401, error?.message || "Invalid access token"));
	}
});

export { verifyWorkerJWT };
