import React from "react";
import { FaTrash, FaThumbsUp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {Loading,Error} from "../index"
import { format } from 'date-fns';
import { allComments } from "../../api/comments";

const Comments = () => {
	// Sample comment data
	const {
		isLoading,
		isError,
		data: response,
		error,
	} = useQuery({
		queryKey: ["all-comments"],
		queryFn: allComments,
		staleTime: 1000 * 60 * 5,
	});

	if (isLoading) {
		return(
			<div className="w-full h-[80vh] flex justify-center items-center">
				<Loading className="w-20" />
			</div>
		)
	}

	if (isError) {
		console.error(error);
		return <Error />;
	}

	const comments = response?.data?.data

	// Sample delete handler
	const handleDelete = (commentId) => {
		console.log(`Delete comment with ID: ${commentId}`);
		// Implement actual delete logic here
	};

	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr className="bg-base-200">
						<th>Date Updated</th>
						<th>Content</th>
						<th>Post Title</th>
						<th>Username</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{comments.map((comment, index) => (
						<tr
							key={comment._id}
							className="hover">
							<td>{format(new Date(comment.updatedAt), 'dd-MM-yyyy')}</td>
							<td>{comment.content}</td>
							<td>{comment.postTitle}</td>
							<td>{comment.username}</td>
							<td>
								<button
									className="btn btn-error btn-sm"
									onClick={() => handleDelete(comment.id)}>
									<FaTrash />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Comments;
