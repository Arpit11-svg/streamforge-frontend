import { formatDuration, formatViews, formatTimeAgo } from "../../utils/formatUtils.js";
import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const thumbnailUrl = video?.thumbnail?.url;
  const ownerName = video?.owner?.fullName || video?.owner?.username || "Unknown creator";
  const ownerAvatar = video?.owner?.avatar;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video._id}`, { state: { video } });
  };


  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-700">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {typeof video?.duration === "number" && (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 transition-all duration-300 group-hover:ring-cyan-400/20 group-hover:shadow-lg group-hover:shadow-cyan-500/20" />
      </div>

      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-600">
          {ownerAvatar ? (
            <img src={ownerAvatar} alt={ownerName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-300">
              {ownerName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
            {video.title}
          </h3>
          <p className="mt-1 truncate text-xs text-slate-300">{ownerName}</p>
          <p className="truncate text-xs text-slate-400">
            {formatViews(video?.views)} • {formatTimeAgo(video?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
