import { Link } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";

export function PlaylistCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-slate-700" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-4/5 rounded bg-slate-700" />
        <div className="h-3 w-2/5 rounded bg-slate-700" />
      </div>
    </div>
  );
}

function PlaylistCard({ playlist }) {
  const thumbnailUrl = playlist?.thumbnail;

  return (
    <Link to={`/playlist/${playlist._id}`} className="group block">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-700">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={playlist.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            <FaLayerGroup className="h-8 w-8" />
          </div>
        )}

        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {playlist.videoCount ?? 0} {playlist.videoCount === 1 ? "video" : "videos"}
        </span>
      </div>

      <div className="mt-3 min-w-0">
        <p className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
          {playlist.name}
        </p>
        {playlist.description && (
          <p className="mt-1 line-clamp-1 text-xs text-slate-400">
            {playlist.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default PlaylistCard;
