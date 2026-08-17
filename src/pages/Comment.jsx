import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useForm } from "react-hook-form";
import CommentService from "../services/comment.service.js";
import { formatTimeAgo } from "../utils/formatUtils.js";

function Comment({ videoId }) {
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!videoId) return;
    CommentService.getVideoComments(videoId)
      .then((response) => {
        setComments(response.data);
        // console.log(
        //   "=======Comments fetched successfully=========",
        //   response.data,
        // );
      })
      .catch((error) => {
        console.error("====Error fetching comments:", error);
      });
  }, [videoId, loading]);

  const submit = async (data) => {
    setLoading(true);

    try {
      await CommentService.addComment(videoId, data.comment);
      console.log("=======Comment added successfully=========");
      reset();
    } catch (error) {
      console.error("====Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          lable=" Add Comment"
          placeholder="Write a comment..."
          {...register("comment", {
            required: "Comment is required",
            minLength: {
              value: 2,
              message: "Comment must be at least 2 characters",
            },
          })}
        />

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Comment..." : "Add Comment"}
        </Button>
      </form>

      <h2 className="mt-6 text-lg font-semibold text-slate-200">
        {" "}
        All Comments
      </h2>

      {comments.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {comments.map((comment) => (
            <li key={comment._id}>
              <div className="mt-4 flex gap-3 rounded-2xl border border-slate-700 bg-slate-700/50 p-4 backdrop-blur-sm">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-600 ring-1 ring-slate-600">
                  {comment?.owner?.avatar ? (
                    <img
                      src={comment.owner.avatar.url || comment.owner.avatar}
                      alt={comment.owner.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-300">
                      {comment.owner.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-cyan-300">
                    {comment.owner.fullName ||
                      comment.owner.username ||
                      "Unknown user"}
                    {comment.createdAt && (
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm font-bold text-slate-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-slate-300">No comments yet.</p>
      )}
    </div>
  );
}

export default Comment;
