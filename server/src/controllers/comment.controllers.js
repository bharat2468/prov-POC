import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const allComments = asyncHandler(async (req, res) => {
	const comments = await Comment.aggregate([
		{
			$sort: {
				createdAt: -1,
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			},
		},
		{
			$lookup: {
				from: "posts",
				localField: "postId",
				foreignField: "_id",
				as: "post",
			},
		},
		{
			$unwind: "$user",
		},
		{
			$unwind: "$post",
		},
		{
			$project: {
				_id: 1,
				content: 1,
				createdAt: 1,
				updatedAt: 1,
				username: "$user.username",
				postTitle: "$post.title",
			},
		},
	]);

	return res
		.status(200)
		.json(
			new ApiResponse(200, comments, "all comments fetched successfully")
		);
});

const createComment = asyncHandler(async (req, res) => {
	const { content, postId } = req.body;

	const userId = req.user._id;

	const comment = await Comment.create({
		content,
		postId,
		userId,
	});

	const createdComment = await Comment.findById(comment?._id);

	if (!createdComment) {
		throw new ApiError(
			500,
			"Something went wrong while creating the comment in the database"
		);
	}

	return res
		.status(201)
		.json(
			new ApiResponse(201, createdComment, "Comment created Successfully")
		);
});

const updateComment = asyncHandler(async (req, res) => {
	const { content } = req.body;

	const commentId = req.params?.commentId;
	const userId = req.user._id;

	const comment = await Comment.findOneAndUpdate(
		{ _id: commentId, userId },
		{ content },
		{ new: true }
	);

	if (!comment) {
		throw new ApiError(
			404,
			"Comment not found or not authorized to update this comment"
		);
	}

	// Return updated user
	return res
		.status(200)
		.json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
	const commentId = req.params?.commentId;
	const userId = req.user._id;

	// Delete the comment in the database
	const deletedComment = await Comment.findOneAndDelete({ _id: commentId, userId });

	if (!deletedComment) {
		throw new ApiError(
			404,
			"Comment not found or not authorized to delete this comment"
		);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, deletedComment, "comment deleted successfully")
		);
});

export { allComments, createComment, updateComment, deleteComment };
