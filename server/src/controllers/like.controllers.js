import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js";
import { Post } from "../models/post.models.js";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Like a post
const likePost = asyncHandler(async (req, res) => {
	const postId = req.params?.postId;
	const userId = req.user._id;


	// Check if the post exists
	const post = await Post.findById(postId);
	if (!post) {
		throw new ApiError(404, "Post not found");
	}

	// Check if the like already exists
	const existingLike = await Like.findOne({ postId, userId });
	if (existingLike) {
		return res
			.status(400)
			.json(new ApiError(400, "You have already liked this post"));
	}

	// Create a new like
	const like = await Like.create({ postId, userId });

	return res
		.status(201)
		.json(new ApiResponse(201, like, "Like created successfully"));
});

// Like a comment
const likeComment = asyncHandler(async (req, res) => {
	const commentId  = req.params?.commentId;
	const userId = req.user._id;

	// Check if the comment exists
	const comment = await Comment.findById(commentId);
	if (!comment) {
		throw new ApiError(404, "Comment not found");
	}

	// Check if the like already exists
	const existingLike = await Like.findOne({ commentId, userId });
	if (existingLike) {
		return res
			.status(400)
			.json(new ApiError(400, "You have already liked this comment"));
	}

	// Create a new like
	const like = await Like.create({ commentId, userId });

	return res
		.status(201)
		.json(new ApiResponse(201, like, "Like created successfully"));
});

// Delete a like
const deleteLike = asyncHandler(async (req, res) => {
	const likeId = req.params.likeId;
	const userId = req.user._id;

	// Find and delete the like
	const like = await Like.findOneAndDelete({ _id: likeId, userId });
	if (!like) {
		throw new ApiError(
			404,
			"Like not found or not authorized to delete this like"
		);
	}

	return res
		.status(200)
		.json(new ApiResponse(200, like, "Like deleted successfully"));
});

export { likePost, likeComment, deleteLike };
