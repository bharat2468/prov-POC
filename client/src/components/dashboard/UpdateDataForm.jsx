import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";

function UpdateDataForm({ user, setShowPasswordForm }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: user?.username,
			email: user?.email,
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		// Handle profile update
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

			<div className="tooltip tooltip-bottom w-full" data-tip="Username cannot be modified">
				<Input label="Username:" {...register("username")} disabled />
			</div>

			<Input
				label="Email:"
				type="email"
				{...register("email", {
					required: "Email is required",
					pattern: {
						value: /^\S+@\S+$/i,
						message: "Invalid email address",
					},
				})}
			/>
			{errors.email && (
				<p className="text-error">{errors.email.message}</p>
			)}

			<div className="flex space-x-2">
				<button type="submit" className="btn btn-primary">
					Update Profile
				</button>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => setShowPasswordForm(true)}>
					Change Password
				</button>
			</div>
		</form>
	);
}

export default UpdateDataForm;
