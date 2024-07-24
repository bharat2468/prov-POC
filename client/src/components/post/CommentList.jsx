// CommentList.jsx
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import CommentItem from './CommentItem';
import { Loading, Error } from "../index";
import { getCommentsForPost } from "../../api/comments";

function CommentList({ postId }) {
    const [page, setPage] = useState(1);
    const [allComments, setAllComments] = useState([]);
    const limit = 2; // You can adjust this value as needed

    const {
        data: response,
        error,
        isLoading,
        isError,
        isFetching,
    } = useQuery({
        queryKey: ["comments", postId, page],
        queryFn: () => getCommentsForPost(postId, page, limit),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (response?.data?.data?.comments) {
            setAllComments(prevComments => [...prevComments, ...response?.data?.data?.comments]);
        }
    }, [response]);

    const loadMoreComments = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (isLoading && page === 1) return <Loading />;
    if (isError) return <Error error={error} />;

    const currentPage = response?.data?.data?.currentPage || 1;
    const totalPages = response?.data?.data?.totalPages || 1;

    return (
        <div className="space-y-4">
            {allComments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
            ))}
            {isFetching && <Loading />}
            {currentPage < totalPages && (
                <button
                    onClick={loadMoreComments}
                    disabled={isFetching}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isFetching ? 'Loading more...' : 'Show More'}
                </button>
            )}
        </div>
    );
}

export default CommentList;