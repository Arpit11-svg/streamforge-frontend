import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import videoService from "../services/video.service.js";
import VideoPlayer from "../components/video/VideoPlayer.jsx";
import { formatViews, formatTimeAgo } from "../utils/formatUtils.js";
import likeService from "../services/like.service.js";
import subscriptionService from "../services/subscription.service.js";
import Comment from "./Comment.jsx";
import authService from "../services/auth.service.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function VideoWatch() {
  const { videoId } = useParams();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeSubmitting, setIsLikeSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isSubscribeSubmitting, setIsSubscribeSubmitting] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // fetch-video from ID
  useEffect(() => {
    if (!videoId) return;
    // Reset must happen before the fetch starts, or navigating between videos
    // briefly shows the previous video's content/error instead of the loading state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // fetch like from videoId
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

  //fetch subscriber of channel by username
  useEffect(() => {
    if (!video?.owner?.username) return;

    authService
      .getUserChannelProfile(video.owner.username)
      .then((response) => {
        setIsSubscribed(response.isSubscribed);
        setSubscriberCount(response.subscribersCount);
      })
      .catch((err) => {
        console.error("Error fetching channel profile:", err);
      });
  }, [video?.owner?.username]);

  const toggleSubscribe = () => {
    if (!video || isSubscribeSubmitting) return;

    const wasSubscribed = isSubscribed;
    setIsSubscribeSubmitting(true);
    setIsSubscribed(!wasSubscribed);
    setSubscriberCount((count) => (wasSubscribed ? count - 1 : count + 1));

    subscriptionService
      .toggleSubscription(video.owner?._id)
      .catch((err) => {
        console.error("Error toggling subscription:", err);
        setIsSubscribed(wasSubscribed);
        setSubscriberCount((count) => (wasSubscribed ? count + 1 : count - 1));
      })
      .finally(() => {
        setIsSubscribeSubmitting(false);
      });
  };

  const ownerName =
    video?.owner?.fullName || video?.owner?.username || "Unknown creator";
  const ownerAvatar = video?.owner?.avatar?.url || video?.owner?.avatar;

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
            {/* video related */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <h1 className="text-lg font-semibold text-white">
                {video.title}
              </h1>

              <button
                type="button"
                onClick={handleLikeToggle}
                disabled={!isAuthenticated || isLikeSubmitting}
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

            {/* owner channel related */}

            <div className="mt-4 flex gap-3 rounded-2xl border border-slate-700 bg-slate-700/50 p-4 backdrop-blur-sm">
              <Link
                to={`/channel/${video.owner?.username}`}
                className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-600 ring-1 ring-slate-600"
              >
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
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/channel/${video.owner?.username}`}
                  className="text-sm font-medium text-cyan-300 hover:underline"
                >
                  {ownerName}
                </Link>
                <p className="text-xs text-slate-400">
                  {subscriberCount}{" "}
                  {subscriberCount === 1 ? "Subscriber" : "Subscribers"}
                </p>
              </div>

              {/* subscribe button */}
              <button
                type="button"
                onClick={toggleSubscribe}
                disabled={!isAuthenticated || isSubscribeSubmitting}
                aria-pressed={isSubscribed}
                className={`h-fit shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  isSubscribed
                    ? "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white"
                    : "border-cyan-400 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                }`}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>

            {/* video description */}
            <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-700/50 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-200">
                {formatViews(video.views)} • {formatTimeAgo(video.createdAt)}
              </p>

              {video.description ? (
                <>
                  <p
                    className={`mt-2 whitespace-pre-line text-sm text-slate-300 ${
                      showFullDescription ? "" : "line-clamp-3"
                    }`}
                  >
                    {video.description}
                  </p>

                  {video.description.length > 180 && (
                    <button
                      type="button"
                      onClick={() => setShowFullDescription((prev) => !prev)}
                      className="mt-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                      {showFullDescription ? "Show less" : "Show more"}
                    </button>
                  )}
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-400">
                  No description provided.
                </p>
              )}
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
