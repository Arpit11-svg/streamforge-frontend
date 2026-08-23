import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dashboardService from "../services/dashboard.service.js";
import videoService from "../services/video.service.js";
import MyVideoCard, { MyVideoCardSkeleton } from "../components/video/MyVideoCard.jsx";

function MyVideos() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!authStatus) return;

    setIsLoading(true);
    setError(null);

    dashboardService
      .getChannelVideos({ page: 1, limit: 20 })
      .then((response) => {
        setVideos(response.data);
      })
      .catch((err) => {
        console.error("Error fetching your videos:", err);
        setError("Couldn't load your videos right now.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authStatus]);

  const handleTogglePublish = (video) => {
    setTogglingId(video._id);
    setVideos((prev) =>
      prev.map((v) =>
        v._id === video._id ? { ...v, isPublished: !v.isPublished } : v
      )
    );

    videoService
      .togglePublishStatus(video._id)
      .catch((err) => {
        console.error("Error toggling publish status:", err);
        setVideos((prev) =>
          prev.map((v) =>
            v._id === video._id ? { ...v, isPublished: video.isPublished } : v
          )
        );
      })
      .finally(() => {
        setTogglingId(null);
      });
  };

  const handleDelete = (video) => {
    //  pops a native browser confirm dialog asking the user to confirm deletion
    if (!window.confirm(`Delete "${video.title}"? This can't be undone.`)) {
      return;
    }

    setDeletingId(video._id);

    videoService
      .deleteVideo(video._id)
      .then(() => {
        setVideos((prev) => prev.filter((v) => v._id !== video._id));
      })
      .catch((err) => {
        console.error("Error deleting video:", err);
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  if (!authStatus) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-400/20">
            <span className="text-3xl">🎬</span>
          </div>

          <h1 className="text-2xl font-bold text-white">Manage your videos</h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in to your StreamForge account to view and manage the videos
            you've uploaded.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
            mt-6
            w-full
            rounded-full
            bg-linear-to-r
            from-blue-500
            to-cyan-400
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-500/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-xl
            hover:shadow-cyan-500/20
            active:scale-95
          "
          >
            Login to Continue
          </button>

          <p className="mt-5 text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">My Videos</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage the videos you've uploaded.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/publish-video")}
            className="shrink-0 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20 active:scale-95"
          >
            Upload Video
          </button>
        </div>

        <div className="mt-8">
          {error ? (
            <p className="mt-16 text-center text-slate-300">{error}</p>
          ) : isLoading ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <MyVideoCardSkeleton key={i} />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-700/50 p-10 text-center">
              <h2 className="text-xl font-bold text-white">No videos yet</h2>
              <p className="text-sm text-slate-400">
                You haven't uploaded any videos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <MyVideoCard
                  key={video._id}
                  video={video}
                  onTogglePublish={handleTogglePublish}
                  onDelete={handleDelete}
                  isToggling={togglingId === video._id}
                  isDeleting={deletingId === video._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyVideos;
