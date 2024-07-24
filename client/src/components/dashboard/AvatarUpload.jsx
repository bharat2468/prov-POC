import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateAvatar } from "../../api/users";

function AvatarUpload({ user }) {
    const [Avatar, setAvatar] = useState(user?.avatar);

    const { register, handleSubmit, formState: { errors },watch } = useForm();
    const avatar = watch("avatar");

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updateAvatar,
        onSuccess: (response) => {
            console.log(response.data.data);
            setAvatar(response.data.data.avatar);
        },
        onError: (error) => {
            console.error("Avatar update failed:", error);
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        if (data) {
            mutate(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <div className="avatar mb-4 max-w-[200px] my-5">
                <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                        src={Avatar || "https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"}
                        alt="Avatar"
                    />
                </div>
            </div>

            <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs mb-4"
                disabled={isLoading}
                {...register("avatar", {
                    required: "Please select an image",
                    validate: {
                        lessThan10MB: (files) => files[0]?.size < 10000000 || "Max 10MB",
                        acceptedFormats: (files) =>
                            ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) ||
                            "Only PNG, JPEG and GIF",
                    }
                })}
            />

            {errors.avatar && (
                <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}

            <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
            >
                Upload Avatar
            </button>

            {isLoading && (
                <p className="text-sm text-blue-500">New image is uploading...</p>
            )}

            {isError && (
                <p className="text-sm text-red-500">Error uploading image: {error.message}</p>
            )}
        </form>
    );
}

export default AvatarUpload;