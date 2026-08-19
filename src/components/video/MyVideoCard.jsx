import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { formatDuration, formatViews, formatTimeAgo } from "../../utils/formatUtils.js";

export function MyVideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-slate-700" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-4/5 rounded bg-slate-700" />
        <div className="h-3 w-2/5 rounded bg-slate-700" />
      </div>
      <div className="mt-3 h-8 w-full rounded-lg bg-slate-700" />
    </div>
  );
}

function MyVideoCard({ video, onTogglePublish, onDelete, isToggling, isDeleting }) {
  const thumbnailUrl = video?.thumbnail?.url;

  return (
    <div>
      <Link
        to={`/video/${video._id}`}
        className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-slate-700"
      >
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

        {!video.isPublished && (
          <span className="absolute left-1.5 top-1.5 rounded bg-amber-500/90 px-1.5 py-0.5 text-xs font-semibold text-slate-900">
            Draft
          </span>
        )}
      </Link>

      <div className="mt-3 min-w-0">
        <Link
          to={`/video/${video._id}`}
          className="line-clamp-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300"
        >
          {video.title}
        </Link>
        <p className="mt-1 truncate text-xs text-slate-400">
          {formatViews(video?.views)} • {video?.likesCount ?? 0} likes •{" "}
          {video?.commentsCount ?? 0} comments
        </p>
        <p className="truncate text-xs text-slate-500">
          {formatTimeAgo(video?.createdAt)}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onTogglePublish(video)}
          disabled={isToggling}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {video.isPublished ? <FaEyeSlash /> : <FaEye />}
          {video.isPublished ? "Unpublish" : "Publish"}
        </button>

        <button
          type="button"
          onClick={() => onDelete(video)}
          disabled={isDeleting}
          aria-label="Delete video"
          className="flex items-center justify-center rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default MyVideoCard;
