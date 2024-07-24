import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentSection({ postId }) {
    return (
        <div className="space-y-4">
            <h2>Comments</h2>
            <CommentForm postId={postId} />
            <CommentList postId={postId} />
        </div>
    );
}

export default CommentSection;