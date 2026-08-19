import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaUsers,
  FaBell,
  FaVideo,
  FaListUl,
  FaFeatherAlt,
  FaEye,
  FaThumbsUp,
  FaComment,
  FaHeart,
  FaCommentDots,
} from "react-icons/fa";
import dashboardService from "../services/dashboard.service.js";
import StatCard, { StatCardSkeleton } from "../components/dashboard/StatCard.jsx";
import { formatCount } from "../utils/formatUtils.js";

const CHANNEL_STATS = [
  { key: "subscribers", label: "Subscribers", icon: FaUsers },
  { key: "videos", label: "Videos", icon: FaVideo },
  { key: "playlists", label: "Playlists", icon: FaListUl },
  { key: "tweets", label: "Tweets", icon: FaFeatherAlt },
];

const ENGAGEMENT_STATS = [
  { key: "totalViews", label: "Total Views", icon: FaEye },
  { key: "totalLikes", label: "Total Likes", icon: FaThumbsUp },
  { key: "totalComments", label: "Total Comments", icon: FaComment },
];

const ACTIVITY_STATS = [
  { key: "likesGiven", label: "Likes Given", icon: FaHeart },
  { key: "commentsMade", label: "Comments Made", icon: FaCommentDots },
  { key: "subscribed", label: "Subscribed To", icon: FaBell },
];

function StatSection({ title, fields, data, isLoading }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? fields.map((field) => <StatCardSkeleton key={field.key} />)
          : fields.map((field) => (
              <StatCard
                key={field.key}
                icon={field.icon}
                label={field.label}
                value={formatCount(data?.[field.key] ?? 0)}
              />
            ))}
      </div>
    </section>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authStatus) return;

    setIsLoading(true);
    setError(null);

    dashboardService
      .getChannelStats()
      .then((response) => {
        setStats(response.data);
      })
      .catch((err) => {
        console.error("Error fetching channel stats:", err);
        setError("Couldn't load your dashboard right now.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authStatus]);

  if (!authStatus) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-400/20">
            <span className="text-3xl">📊</span>
          </div>

          <h1 className="text-2xl font-bold text-white">
            Track your channel's performance
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in to your StreamForge account to view your dashboard.
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
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          An overview of your channel's performance.
        </p>

        {error ? (
          <p className="mt-16 text-center text-slate-300">{error}</p>
        ) : (
          <div className="mt-8 flex flex-col gap-10">
            <StatSection
              title="Channel"
              fields={CHANNEL_STATS}
              data={stats?.channel}
              isLoading={isLoading}
            />
            <StatSection
              title="Engagement"
              fields={ENGAGEMENT_STATS}
              data={stats?.engagement}
              isLoading={isLoading}
            />
            <StatSection
              title="Your Activity"
              fields={ACTIVITY_STATS}
              data={stats?.activity}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
