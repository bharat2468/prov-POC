import React from "react";

function Dashboard() {
	// This data should be fetched from your API
	const stats = {
		users: 1000,
		comments: 5000,
		posts: 500,
	};

	const recentData = {
		users: [
			{ id: 1, name: "John Doe", email: "john@example.com" },
			{ id: 2, name: "Jane Smith", email: "jane@example.com" },
			// ... more users
		],
		comments: [
			{ id: 1, user: "John Doe", content: "Great post!" },
			{ id: 2, user: "Jane Smith", content: "Very informative." },
			// ... more comments
		],
		posts: [
			{ id: 1, title: "Introduction to React", author: "John Doe" },
			{
				id: 2,
				title: "Advanced JavaScript Techniques",
				author: "Jane Smith",
			},
			// ... more posts
		],
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="stat-title">Total Users</div>
						<div className="stat-value">{stats.users}</div>
					</div>
				</div>
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="stat-title">Total Comments</div>
						<div className="stat-value">{stats.comments}</div>
					</div>
				</div>
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="stat-title">Total Posts</div>
						<div className="stat-value">{stats.posts}</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Recent Users</h2>
						<ul>
							{recentData.users.map((user) => (
								<li key={user.id}>
									{user.name} - {user.email}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Recent Comments</h2>
						<ul>
							{recentData.comments.map((comment) => (
								<li key={comment.id}>
									{comment.user}: {comment.content}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Recent Posts</h2>
						<ul>
							{recentData.posts.map((post) => (
								<li key={post.id}>
									{post.title} by {post.author}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
