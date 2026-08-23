import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import likeService from "../services/like.service";
import VideoCard from "../components/video/VideoCard";
import { Link } from "react-router-dom";

function LikedVideos() {
  const [videos, setVideos] = useState([]);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    likeService
      .getCurrentUserLikedVideos()
      .then((response) => {
        setVideos(response.data.map((like) => like.video).filter(Boolean));
      })
      .catch((err) => {
        console.error("ERROR FETCHING VIDEOS: ", err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-800 px-4">
        <div className="max-w-md rounded-2xl border border-slate-700 bg-slate-700/50 p-10 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
            <FaThumbsUp className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Sign in to see your liked videos
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Videos you like will show up here so you can find them again
            anytime.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block rounded-full border border-cyan-400 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/20"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
            <FaThumbsUp className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              Liked Videos
            </h1>
            {!isLoading && !error && (
              <p className="text-sm text-slate-400">
                {videos.length} {videos.length === 1 ? "video" : "videos"}
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video w-full rounded-xl bg-slate-700" />
                <div className="mt-3 flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-slate-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-4/5 rounded bg-slate-700" />
                    <div className="h-3 w-2/5 rounded bg-slate-700" />
                    <div className="h-3 w-1/3 rounded bg-slate-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-700 p-10 text-center">
            <h2 className="text-xl font-semibold text-white">
              Something went wrong
            </h2>
            <p className="text-gray-400">
              We couldn't load your liked videos. Please try again.
            </p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-slate-700 p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-600 text-slate-300">
              <FaThumbsUp className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">No Videos Found</h2>
            <p className="text-gray-400">You have not liked any video yet.</p>
            <Link
              to="/"
              className="mt-2 rounded-full border border-cyan-400 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/20"
            >
              Browse videos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedVideos;
