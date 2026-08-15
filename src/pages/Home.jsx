import { useState, useEffect } from "react";
import videoService from "../services/video.service.js";
import VideoCard from "../components/video/VideoCard.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);

   useEffect(() => {

    if(!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    videoService
      .getAllVideos()
      .then((response) => {
        setVideos(response.data.docs);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError("Something went wrong while loading videos.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {

    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 px-4">
        <Link to="/login">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-5xl font-extrabold mb-6">
              Welcome to <span className="text-blue-600">StreamForge 🚀</span>
            </h1>

            <p className="text-xl text-gray-700 mb-4">
              Discover amazing videos, share your creativity, and connect with a
              growing community of creators.
            </p>

            <p className="text-lg text-gray-600">
              Login to explore videos, build your channel, and start sharing
              your content with the world.
            </p>
          </div>
        </Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
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
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-slate-700 p-10 text-center">
            <h2 className="text-2xl font-bold text-white">No Videos Found</h2>
            <p className="text-gray-400">
              Be the first to upload a video and share your content with the
              world!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
