import { asyncHandler } from "../utils/asyncHandler.js";
import { Worker } from "../models/worker.schema.js";
import { User } from "../models/user.models.js";
import {Scheme} from "../models/scheme.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (id) => {
	try {
		const worker = await Worker.findById(id);
		const accessToken = await worker.generateAccessToken();
		const refreshToken = await worker.generateRefreshToken();

		worker.refreshToken = refreshToken;
		await worker.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			error?.message || "Something went wrong while generating Access and Refresh tokens"
		);
	}
};


const addUser = asyncHandler(async (req, res) => {
	const { username } = req.body; // Get username from request parameters

	// Find the user by username
	const user = await User.findOne({ username });

	// If the user does not exist, throw an error
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	// Update the worker's users field with the found user's ID
	const updatedWorker = await Worker.findByIdAndUpdate(
		req.worker._id, // Assuming workerId is passed in the request body
		{ $addToSet: { users: user._id } }, // Add user ID to the users array if not already present
		{ new: true } // Return the updated document
	);

	// If the worker is not found, throw an error
	if (!updatedWorker) {
		throw new ApiError(404, "Worker not found");
	}

	// Send a success response
	res.status(200).json(
		new ApiResponse(200, "User added to worker successfully", updatedWorker)
	);
});

const registerWorker = asyncHandler(async (req, res) => {
	// Get data from the request
	const {
		firstname,
		lastname,
		username,
		email,
		password,
		phone,
		pincode,
		address,
		levelOfEducation,
		languageKnown,
	} = req.body;

	// Check for existing worker using username, email, or phone
	const existingWorker = await Worker.findOne({
		$or: [
			{ username: username.toLowerCase() },
			{ email: email.toLowerCase() },
			{ phone: phone.trim() },
		],
	});

	if (existingWorker) {
		throw new ApiError(
			400,
			"Worker with the same username, email, or phone already exists"
		);
	}

	// Create new worker document in the database
	const worker = await Worker.create({
		firstname,
		lastname,
		username: username.toLowerCase(),
		email: email.toLowerCase(),
		password,
		phone: phone.trim(),
		pincode: pincode.trim(),
		address: address.trim(),
		levelOfEducation,
		languageKnown,
	});

	// Check for the created worker and exclude password and sensitive fields
	const createdWorker = await Worker.findById(worker._id).select("-password");

	if (!createdWorker) {
		throw new ApiError(
			500,
			"Something went wrong while registering the worker in the database"
		);
	}

	// Return the data by removing sensitive fields
	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				createdWorker,
				"Worker registered successfully"
			)
		);
});

const loginWorker = asyncHandler(async (req, res) => {
	const { usernameOrEmail, password } = req.body;

	// Check for the worker in the database using username or email
	const worker = await Worker.findOne({
		$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
	});

	if (!worker) {
		throw new ApiError(400, "Invalid username or email");
	}

	// Check if the password is correct
	const passwordCorrect = await worker.isPasswordCorrect(password);

	if (!passwordCorrect) {
		throw new ApiError(400, "Invalid password");
	}

	// Generate access and refresh tokens
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		worker._id
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	// Convert worker to plain object and remove sensitive information
	const workerObject = worker.toObject();
	delete workerObject.password;
	delete workerObject.refreshToken;

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{ worker: workerObject, accessToken, refreshToken },
				"Worker logged in successfully"
			)
		);
});

const logoutWorker = asyncHandler(async (req, res) => {
	const worker = await Worker.findByIdAndUpdate(
		req.worker._id,
		{ $set: { refreshToken: null } },
		{ new: true }
	);

	if (!worker) {
		throw new ApiError(400, "Failed to update worker refreshToken");
	}

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "Worker logged out successfully"));
});

const getWorkerDashboard = asyncHandler(async (req, res) => {
    if (!req.worker || !req.worker._id) {
        throw new ApiError(401, "Unauthorized or invalid worker");
    }

    const workerId = req.worker._id;

    const worker = await Worker.findById(workerId).populate("users");
    if (!worker) {
        throw new ApiError(404, "Worker not found");
    }

    if (!worker.users || worker.users.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No users assigned to this worker"));
    }

    const users = await User.find({ _id: { $in: worker.users } })
        .select("username email schemes")
        .populate({
            path: "schemes.schemeId",
            model: "Scheme",
            select: "name description",
        });

    if (!users || users.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No user data found for this worker"));
    }

    const responseData = users.map((user) => ({
        username: user.username,
        email: user.email,
        schemes: (user.schemes || []).map((scheme) => ({
            schemeId: scheme.schemeId?._id,
            schemeName: scheme.schemeId?.name,
            schemeDescription: scheme.schemeId?.description,
            status: scheme.status,
            applicationDate: scheme.applicationDate,
        })),
    }));

    return res.status(200).json(new ApiResponse(200, responseData, "Worker dashboard data fetched successfully"));
});
const getNearestWorker = asyncHandler(async (req, res) => {
	const { pincode } = req.body;

	// Retrieve worker based on pincode
	const worker = await Worker.findOne({ pincode });

	if (!worker) {
		throw new ApiError(404, "No workers found for the provided pincode");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, worker, "Worker retrieved successfully"));
});


const approvedWorkers = asyncHandler(async (req, res) => {
	const workers = await Worker.aggregate([
		{
			$match: { isApproved: true },
		},
		{
			$project: {
				name: { $concat: ["$firstname", " ", "$lastname"] },
				levelOfEducation: 1,
				isApproved: 1,
                pincode:1,
				usersCount: { $size: "$users" },
			},
		},
	]);

	if (!workers.length) {
		throw new ApiError(404, "No approved workers found");
	}

	return res.status(200).json(new ApiResponse(200, workers, "Approved workers retrieved successfully"));
});


const notApprovedWorkers = asyncHandler(async (req, res) => {
	const workers = await Worker.aggregate([
		{
			$match: { isApproved: false },
		},
		{
			$project: {
				name: { $concat: ["$firstname", " ", "$lastname"] },
				levelOfEducation: 1,
				isApproved: 1,
				usersCount: { $size: "$users" },
			},
		},
	]);

	if (!workers.length) {
		throw new ApiError(404, "No not approved workers found");
	}

	return res.status(200).json(new ApiResponse(200, workers, "Not approved workers retrieved successfully"));
});


const addSchemeToUser = asyncHandler(async (req, res) => {
	const { schemeTitle, userId } = req.body;

	// Validate input
	if (!schemeTitle || !userId) {
		throw new ApiError(400, "Scheme title and user ID are required");
	}

	// Find the scheme ID using aggregation
	const scheme = await Scheme.aggregate([
		{
			$match: {
				name: schemeTitle,
			},
		},
		{
			$project: {
				_id: 1, // Include only the scheme ID
			},
		},
	]);

	if (!scheme.length) {
		throw new ApiError(404, "Scheme not found");
	}

	const schemeId = scheme[0]._id;

	// Update the user's schemes array
	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{
			$addToSet: { schemes: schemeId }, // Add scheme ID to array if it doesn't already exist
		},
		{
			new: true,
		}
	);

	if (!updatedUser) {
		throw new ApiError(404, "User not found");
	}

	return res.status(200).json(new ApiResponse(200, updatedUser, "Scheme added to user successfully"));
});


const getWorkerUsers = asyncHandler(async (req, res) => {
	// Extract worker ID from request parameters
	const workerId = req.params.id || req.worker._id;

	// Check if the worker exists
	const workerExists = await Worker.findById(workerId);
	if (!workerExists) {
		throw new ApiError(404, "Worker not found");
	}

	// Perform aggregation pipeline
	const workerUsers = await Worker.aggregate([
		{
			$match: { _id: new mongoose.Types.ObjectId(workerId) }
		},
		{
			$unwind: "$users"
		},
		{
			$lookup: {
				from: "users",
				localField: "users",
				foreignField: "_id",
				as: "userDetails"
			}
		},
		{
			$unwind: "$userDetails"
		},
		{
			$project: {
				_id: "$userDetails._id",
				name: "$userDetails.fullname",
				username: "$userDetails.username",
				age: "$userDetails.age",
				schemesCount: { $size: "$userDetails.schemes" }
			}
		}
	]);

	// Return the results
	return res
		.status(200)
		.json(new ApiResponse(200, workerUsers, "User details fetched successfully"));
});



const getAllWorkers = asyncHandler(async (req, res) => {
	// Fetch all workers with selected fields
    console.log("bharat")
	const workers = await Worker.find({});

	if (!workers.length) {
		return res.status(200).json(new ApiResponse(200, [], "No workers found"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, workers, "All workers fetched successfully"));
});


const getWorkerById = asyncHandler(async (req, res) => {
	// Extract worker ID from request parameters
	const workerId = req.params.id;

	// Fetch the worker details by ID
	const worker = await Worker.findById(workerId, 'fullname phone email isApproved');

	if (!worker) {
		throw new ApiError(404, "Worker not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, worker, "Worker details fetched successfully"));
});



export {
	addUser,
	registerWorker,
	loginWorker,
	logoutWorker,
	getWorkerDashboard,
    addSchemeToUser,
    notApprovedWorkers,
    approvedWorkers,
    getNearestWorker,
    getWorkerUsers,
    getAllWorkers,
    getWorkerById
};
