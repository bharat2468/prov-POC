import { asyncHandler } from "../utils/asyncHandler.js";
import { Scheme } from "../models/scheme.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllSchemes = asyncHandler(async (req, res) => {
	const schemes = await Scheme.aggregate([
		{
			$sort: {
				createdAt: -1,
			},
		},
		{
			$project: {
				_id: 1,
				name: 1,
				tags: 1,
				description: 1,
				department: 1,
				docsRequired: 1,
				status: 1,
				createdAt: 1,
				updatedAt: 1,
			},
		},
	]);

	if (!schemes.length) {
		throw new ApiError(404, "No schemes found");
	}

	return res.status(200).json(new ApiResponse(200, schemes, "All schemes retrieved successfully"));
});

export {getAllSchemes}