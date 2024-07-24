import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {Loading,Error} from "../index"
import { format } from 'date-fns';
import { allPosts } from "../../api/posts";

const Posts = () => {
	const {
		isLoading,
		isError,
		data: response,
		error,
	} = useQuery({
		queryKey: ["all-posts"],
		queryFn: allPosts,
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

	// Sample post data
	const posts =  response?.data?.data?.posts;

	// Sample edit handler
	const handleEdit = (postId) => {
		console.log(`Edit post with ID: ${postId}`);
		// Implement actual edit logic here
	};

	// Sample delete handler
	const handleDelete = (postId) => {
		console.log(`Delete post with ID: ${postId}`);
		// Implement actual delete logic here
	};

	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr className="bg-base-200">
						<th>Date Updated</th>
						<th>Image</th>
						<th>Title</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post, index) => (
						<tr
							key={post._id}
							className="hover">
							<td>{format(new Date(post.updatedAt), 'dd-MM-yyyy')}</td>
							<td>
								<div className="w-16 h-16">
									<img
										src={post.featuredImage}
										alt={post.title}
										className="object-cover w-full h-full"
									/>
								</div>
							</td>
							<td>{post.title}</td>
							<td>
								<button
									className="btn btn-warning btn-sm"
									onClick={() => handleEdit(post.id)}>
									<FaEdit />
								</button>
							</td>
							<td>
								<button
									className="btn btn-error btn-sm"
									onClick={() => handleDelete(post.id)}>
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

export default Posts;
