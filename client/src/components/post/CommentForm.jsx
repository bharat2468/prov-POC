// CommentForm.jsx
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function CommentForm({ postId }) {
	// const queryClient = useQueryClient();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	// const addCommentMutation = useMutation(
	// 	(newComment) => axios.post(`/api/posts/${postId}/comments`, newComment),
	// 	{
	// 		onSuccess: () => {
	// 			queryClient.invalidateQueries(['comments', postId]);
	// 			reset();
	// 		},
	// 	}
	// );

	const onSubmit = (data) => {
		// addCommentMutation.mutate(data);
		console.log('comment added button clicked');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mb-6">
			<div className="mb-4">
				<textarea
					{...register("content", { required: "Comment is required" })}
					className="w-full p-2 border rounded-md"
					rows="3"
					placeholder="Add a comment..."
				></textarea>
				{errors.content && <p className="text-red-500">{errors.content.message}</p>}
			</div>
			<button
				type="submit"
				className="px-4 py-2 bg-primary text-primary-content rounded-md hover:bg-primary-focus"
				// disabled={addCommentMutation.isLoading}
			>
				{/* {addCommentMutation.isLoading ? 'Posting...' : 'Post Comment'} */}Post
			</button>
		</form>
	);
}

export default CommentForm;