// CommentItem.jsx
import { FaRegHeart,FaHeart } from "react-icons/fa";

function CommentItem({ comment }) {
	return (
		<div className="rounded-lg bg-base-200 p-4 shadow">
			<div className="flex items-start gap-4">
				<div className="avatar h-10 w-10 shrink-0 border">
					<img
						src={comment.user.avatar || "/placeholder-user.jpg"}
						alt={comment.user.username}
					/>
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="font-medium">
							@{comment.user.username}
						</div>
						<div className="text-sm text-muted">
							<time dateTime={comment.createdAt}>
								{new Date(
									comment.createdAt
								).toLocaleDateString()}
							</time>
						</div>
					</div>
					<p className="mt-2">{comment.content}</p>
					<div className="text-sm text-muted">
						{comment.isLiked ? <FaHeart className="mr-1 inline-block"/> : <FaRegHeart className="mr-1 inline-block"/> }
						{comment.likesCount} likes
					</div>
				</div>
			</div>
		</div>
	);
}

export default CommentItem;

// CommentItem.jsx
// import { useState } from 'react';
// import { FaRegHeart, FaHeart, FaEdit, FaTrash } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useForm } from 'react-hook-form';
// import { likeComment,unlike} from '../../api/likes';
// import { update,deleteComment} from '../../api/comments';
// import axios from 'axios';

// function CommentItem({ comment }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const currentUser = useSelector((state) => state.auth.user);
//     const queryClient = useQueryClient();
//     const { register, handleSubmit, reset } = useForm({
//         defaultValues: { content: comment.content }
//     });

//     const { mutate:likeCommentLocal } = useMutation(
//         {
//             mutationFn:likeComment,
//             onSuccess: () => {
//                 queryClient.invalidateQueries('comments');
//             },
//         }
//     );

//     const { mutate: unlikeComment } = useMutation(
//         {
//             mutationFn:unlike,
//             onSuccess: () => {
//                 queryClient.invalidateQueries('comments');
//             },
//         }
//     );

//     const { mutate: deleteCommentLocal } = useMutation(
//         {
//             mutationFn:deleteComment,
//             onSuccess: () => {
//                 queryClient.invalidateQueries('comments');
//             },
//         }
//     );

//     const { mutate: updateComment } = useMutation(
//         {
//             mutationFn:update,
//             onSuccess: () => {
//                 queryClient.invalidateQueries('comments');
//                 setIsEditing(false);
//             },
//         }
//     );

//     const handleLikeUnlike = () => {
//         if (comment.isLiked) {
//             // Assuming the API returns the likeId when fetching comments
//             // If not, you might need to fetch the likeId separately
//             unlikeComment(comment.likeId);
//         } else {
//             likeCommentLocal(comment._id);
//         }
//     };

//     const handleDelete = () => {
//         if (window.confirm('Are you sure you want to delete this comment?')) {
//             deleteCommentLocal(comment._id);
//         }
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const onSubmit = (data) => {
//         updateComment({ commentId: comment._id, content: data.content });
//     };

//     const isOwnComment = currentUser && currentUser._id === comment.user._id;

//     return (
//         <div className="rounded-lg bg-base-200 p-4 shadow">
//             <div className="flex items-start gap-4">
//                 <div className="avatar h-10 w-10 shrink-0 border">
//                     <img
//                         src={comment.user.avatar || "/placeholder-user.jpg"}
//                         alt={comment.user.username}
//                     />
//                 </div>
//                 <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                         <div className="font-medium">
//                             @{comment.user.username}
//                         </div>
//                         <div className="text-sm text-muted">
//                             <time dateTime={comment.createdAt}>
//                                 {new Date(comment.createdAt).toLocaleDateString()}
//                             </time>
//                         </div>
//                     </div>
//                     {isEditing ? (
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <textarea
//                                 {...register('content', { required: true })}
//                                 className="w-full p-2 border rounded"
//                             />
//                             <button type="submit" className="btn btn-primary mt-2">Update</button>
//                             <button onClick={() => {
//                                 setIsEditing(false);
//                                 reset();
//                             }} className="btn btn-secondary mt-2 ml-2">Cancel</button>
//                         </form>
//                     ) : (
//                         <p className="mt-2">{comment.content}</p>
//                     )}
//                     <div className="text-sm text-muted flex items-center justify-between mt-2">
//                         <div>
//                             <button onClick={handleLikeUnlike}>
//                                 {comment.isLiked ? <FaHeart className="mr-1 inline-block"/> : <FaRegHeart className="mr-1 inline-block"/>}
//                             </button>
//                             {comment.likesCount} likes
//                         </div>
//                         {isOwnComment && (
//                             <div>
//                                 <button onClick={handleEdit} className="mr-2">
//                                     <FaEdit />
//                                 </button>
//                                 <button onClick={handleDelete}>
//                                     <FaTrash />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CommentItem;