import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FaRegComment, FaPaperPlane } from "react-icons/fa";
import CommentService from "../services/comment.service.js";
import { formatTimeAgo } from "../utils/formatUtils.js";

function CommentAvatar({ name, avatarUrl, size = "h-10 w-10" }) {
  return (
    <div
      className={`${size} shrink-0 overflow-hidden rounded-full bg-slate-600 ring-1 ring-slate-600`}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-300">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex animate-pulse gap-3 py-4 first:pt-0">
      <div className="h-10 w-10 shrink-0 rounded-full bg-slate-700" />
      <div className="min-w-0 flex-1 space-y-2 pt-1">
        <div className="h-3 w-1/4 rounded bg-slate-700" />
        <div className="h-3 w-2/3 rounded bg-slate-700" />
      </div>
    </div>
  );
}

function Comment({ videoId }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const commentValue = watch("comment", "");

  const [posting, setPosting] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData)?.data;
  const currentUserName = userData?.fullName || userData?.username || "You";
  const currentUserAvatar = userData?.avatar?.url || userData?.avatar;

  const fetchComments = useCallback(() => {
    if (!videoId) return;
    CommentService.getVideoComments(videoId)
      .then((response) => {
        setComments(response.data || []);
      })
      .catch((error) => {
        console.error("====Error fetching comments:", error);
      })
      .finally(() => setCommentsLoading(false));
  }, [videoId]);

  useEffect(() => {
    setCommentsLoading(true);
    fetchComments();
  }, [fetchComments]);

  const submit = async (data) => {
    setPosting(true);

    try {
      await CommentService.addComment(videoId, data.comment);
      reset();
      fetchComments();
    } catch (error) {
      console.error("====Error adding comment:", error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-slate-200">
        <FaRegComment className="text-cyan-300" />
        <h2 className="text-lg font-semibold">
          {comments.length > 0 ? `${comments.length} Comments` : "Comments"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(submit)} className="mt-4 flex items-start gap-3">
        <CommentAvatar name={currentUserName} avatarUrl={currentUserAvatar} />

        <div className="min-w-0 flex-1">
          <div className="relative">
            <textarea
              rows={1}
              placeholder={isAuthenticated ? "Add a comment..." : "Sign in to comment"}
              disabled={!isAuthenticated || posting}
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 2,
                  message: "Comment must be at least 2 characters",
                },
              })}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="submit"
              aria-label="Post comment"
              disabled={!isAuthenticated || posting || !commentValue?.trim()}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <FaPaperPlane className="h-3.5 w-3.5" />
            </button>
          </div>

          {errors.comment && (
            <p className="mt-1.5 text-xs text-red-400">{errors.comment.message}</p>
          )}
        </div>
      </form>

      <div className="mt-6 divide-y divide-slate-700/60">
        {commentsLoading ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : comments.length > 0 ? (
          comments.map((comment) => {
            const name =
              comment?.owner?.fullName || comment?.owner?.username || "Unknown user";
            const avatarUrl = comment?.owner?.avatar?.url || comment?.owner?.avatar;

            return (
              <div
                key={comment._id}
                className="group flex gap-3 py-4 first:pt-0"
              >
                <CommentAvatar name={name} avatarUrl={avatarUrl} />

                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-medium text-cyan-300">{name}</span>
                    {comment.createdAt && (
                      <span className="text-xs text-slate-400">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <FaRegComment className="h-6 w-6 text-slate-600" />
            <p className="text-sm text-slate-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
