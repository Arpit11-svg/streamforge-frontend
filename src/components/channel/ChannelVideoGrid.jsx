import VideoCard from "../video/VideoCard.jsx";

function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-slate-700" />
      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-slate-700" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-4/5 rounded bg-slate-700" />
          <div className="h-3 w-2/5 rounded bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

function ChannelVideoGrid({ videos, isLoading, channelName }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-700/50 p-10 text-center">
        <h2 className="text-xl font-bold text-white">No videos yet</h2>
        <p className="text-sm text-slate-400">
          {channelName} hasn't uploaded any videos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default ChannelVideoGrid;
