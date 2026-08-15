import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import videoService from "../services/video.service.js";
import VideoPlayer from "../components/video/VideoPlayer.jsx";
import { formatViews, formatTimeAgo } from "../utils/formatUtils.js";
import likeService from "../services/like.service.js";
import Comment from "./Comment.jsx";

function VideoWatch() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeSubmitting, setIsLikeSubmitting] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    likeService
      .getVideoLikes(videoId)
      .then((response) => {
        setLikesCount(response.data.likes);
      })
      .catch((err) => {
        console.error("Error fetching likes count:", err);
      });
  }, [videoId]);

  const handleLikeToggle = () => {
    if (!videoId || isLikeSubmitting) return;

    const wasLiked = isLiked;
    setIsLikeSubmitting(true);
    setIsLiked(!wasLiked);
    setLikesCount((count) => (wasLiked ? count - 1 : count + 1));

    likeService
      .likePost(videoId)
      .catch((err) => {
        console.error("Error toggling like:", err);
        setIsLiked(wasLiked);
        setLikesCount((count) => (wasLiked ? count + 1 : count - 1));
      })
      .finally(() => {
        setIsLikeSubmitting(false);
      });
  };

  useEffect(() => {
    if (!videoId) return;
    setIsLoading(true);
    setError(null);

    videoService
      .getVideoById(videoId)
      .then((response) => {
        setVideo(response.data);
      })
      .catch((err) => {
        console.error("Error fetching video:", err);
        setError("Something went wrong while loading this video.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [videoId]);


  const ownerName =
    video?.owner?.fullName || video?.owner?.username || "Unknown creator";
  const ownerAvatar = video?.owner?.avatar;

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="aspect-video w-full rounded-xl bg-slate-700" />
            <div className="mt-4 h-5 w-3/5 rounded bg-slate-700" />
            <div className="mt-4 flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-slate-700" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/4 rounded bg-slate-700" />
                <div className="h-3 w-2/5 rounded bg-slate-700" />
              </div>
            </div>
          </div>
        ) : error ? (
          <p className="mt-16 text-center text-slate-300">{error}</p>
        ) : video ? (
          <div>
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-slate-700">
              <VideoPlayer
                videoUrl={video.videoFile?.url}
                thumbnailUrl={video.thumbnail?.url}
              />
            </div>
            <div className="h-0.5 w-full bg-linear-to-r from-blue-500 via-cyan-300 to-blue-500" />

            <div className="mt-4 flex items-center justify-between gap-3">
              <h1 className="text-lg font-semibold text-white">
                {video.title}
              </h1>

              <button
                type="button"
                onClick={handleLikeToggle}
                disabled={isLikeSubmitting}
                aria-pressed={isLiked}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  isLiked
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                {isLiked ? (
                  <FaThumbsUp className="h-4 w-4" />
                ) : (
                  <FaRegThumbsUp className="h-4 w-4" />
                )}
                {likesCount || 0}
              </button>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              {formatViews(video.views)} • {formatTimeAgo(video.createdAt)}
            </p>

            <div className="mt-4 flex gap-3 rounded-2xl border border-slate-700 bg-slate-700/50 p-4 backdrop-blur-sm">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-600 ring-1 ring-slate-600">
                {ownerAvatar ? (
                  <img
                    src={ownerAvatar}
                    alt={ownerName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-300">
                    {ownerName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-cyan-300">{ownerName}</p>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-300">
                  {video.description}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-700/50 p-4 backdrop-blur-sm">
              <Comment videoId={videoId} />
            </div>
          </div>
        ) : (
          <p className="mt-16 text-center text-slate-300">Video not found.</p>
        )}
      </div>
    </div>
  );
}

export default VideoWatch;
