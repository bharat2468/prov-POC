import React from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { allUsers } from "../../api/users";
import { useQuery } from "@tanstack/react-query";
import {Loading,Error} from "../index"
import { format } from 'date-fns';

const Users = () => {
	// Sample user data

	const {
		isLoading,
		isError,
		data: response,
		error,
	} = useQuery({
		queryKey: ["all-users"],
		queryFn: allUsers,
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


	const users = response?.data?.data;

	// Sample delete handler
	const handleDelete = (userId) => {
		console.log(`Delete user with ID: ${userId}`);
		// Implement actual delete logic here
	};

	return (
		<div className="overflow-x-auto">
			<table className="table rounded-md">
				<thead>
					<tr className="bg-base-200">
						<th>Date Created</th>
						<th>User Image</th>
						<th>Username</th>
						<th>Email</th>
						<th>Is Admin</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr
							key={user._id}
                            className="hover"
							>
							<td>{format(new Date(user.createdAt), 'dd-MM-yyyy')}</td>
							<td>
								<div className="avatar">
									<div className="w-8 mask mask-squircle">
										<img
											src={user.avatar || "https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"}
											alt={user.username}
										/>
									</div>
								</div>
							</td>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>
								{user.role === "admin" ? (
									<FaCheck className="text-green-500" />
								) : (
									<FaTimes className="text-red-500" />
								)}
							</td>
							<td>
								<button
									className="btn btn-error btn-sm"
									onClick={() => handleDelete(user.id)}>
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

export default Users;
