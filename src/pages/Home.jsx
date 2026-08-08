import { useState, useEffect } from "react";
import videoService from "../services/video.service.js";
import VideoCard from "../components/video/VideoCard.jsx";

function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

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
        ) : error ? (
          <p className="mt-16 text-center text-slate-400">{error}</p>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-slate-400">No videos available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
