function ChannelHeader({
  channel,
  isOwnChannel,
  isSubscribed,
  isSubscribeSubmitting,
  onToggleSubscribe,
}) {
  const { fullName, username, avatar, coverImage, subscribersCount } = channel;

  const displayName = fullName || username;
  const avatarUrl = avatar?.url || avatar;
  const coverUrl = coverImage?.url || coverImage;

  return (
    <div>
      {/* Cover image */}
      <div className="h-32 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 sm:h-48 md:h-56">
        {coverUrl && (
          <img
            src={coverUrl}
            alt={`${displayName}'s cover`}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Identity row */}
      <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:px-4">
        <div className="-mt-10 h-24 w-24 shrink-0 overflow-hidden rounded-full bg-slate-600 ring-4 ring-slate-800 sm:-mt-12 sm:h-32 sm:w-32">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-300">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold text-white">
            {displayName}
          </h1>
          <p className="mt-1 truncate text-sm text-slate-400">
            @{username} • {subscribersCount}{" "}
            {subscribersCount === 1 ? "subscriber" : "subscribers"}
          </p>
        </div>

        {!isOwnChannel && (
          <button
            type="button"
            onClick={onToggleSubscribe}
            disabled={isSubscribeSubmitting}
            aria-pressed={isSubscribed}
            className={`h-fit shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              isSubscribed
                ? "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white"
                : "border-cyan-400 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
            }`}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>

      <div className="mt-6 h-px w-full bg-slate-700" />
    </div>
  );
}

export default ChannelHeader;
