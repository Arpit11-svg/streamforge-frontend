import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../services/auth.service.js";
import videoService from "../services/video.service.js";
import subscriptionService from "../services/subscription.service.js";
import ChannelHeader from "../components/channel/ChannelHeader.jsx";
import ChannelVideoGrid from "../components/channel/ChannelVideoGrid.jsx";

function ChannelView() {
  const { username } = useParams();
  const currentUsername = useSelector(
    (state) => state.auth.userData?.data?.username
  );

  const [channel, setChannel] = useState(null);
  const [isChannelLoading, setIsChannelLoading] = useState(true);
  const [channelError, setChannelError] = useState(null);

  const [videos, setVideos] = useState([]);
  const [isVideosLoading, setIsVideosLoading] = useState(true);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribeSubmitting, setIsSubscribeSubmitting] = useState(false);

  // Fetch channel profile whenever the route username changes.
  useEffect(() => {
    if (!username?.trim()) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsChannelLoading(true);
    setChannelError(null);

    authService
      .getUserChannelProfile(username)
      .then((profile) => {
        setChannel(profile);
        setIsSubscribed(profile.isSubscribed);
      })
      .catch((err) => {
        console.error("Error fetching channel profile:", err);
        setChannelError("This channel doesn't exist or couldn't be loaded.");
      })
      .finally(() => {
        setIsChannelLoading(false);
      });
  }, [username]);

  // Fetch the channel's videos once we know the channel's id.
  useEffect(() => {
    if (!channel?._id) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVideosLoading(true);

    videoService
      .getVideosByOwner(channel._id)
      .then((response) => {
        setVideos(response.data.docs);
      })
      .catch((err) => {
        console.error("Error fetching channel videos:", err);
      })
      .finally(() => {
        setIsVideosLoading(false);
      });
  }, [channel?._id]);

  const toggleSubscribe = () => {
    if (!channel || isSubscribeSubmitting) return;

    const wasSubscribed = isSubscribed;
    setIsSubscribeSubmitting(true);
    setIsSubscribed(!wasSubscribed);
    setChannel((prev) => ({
      ...prev,
      subscribersCount: wasSubscribed
        ? prev.subscribersCount - 1
        : prev.subscribersCount + 1,
    }));

    subscriptionService
      .toggleSubscription(channel._id)
      .catch((err) => {
        console.error("Error toggling subscription:", err);
        setIsSubscribed(wasSubscribed);
        setChannel((prev) => ({
          ...prev,
          subscribersCount: wasSubscribed
            ? prev.subscribersCount + 1
            : prev.subscribersCount - 1,
        }));
      })
      .finally(() => {
        setIsSubscribeSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        {isChannelLoading ? (
          <div className="animate-pulse">
            <div className="h-32 w-full rounded-2xl bg-slate-700 sm:h-48 md:h-56" />
            <div className="flex items-center gap-4 px-2 sm:px-4">
              <div className="-mt-10 h-24 w-24 shrink-0 rounded-full bg-slate-600 ring-4 ring-slate-800 sm:-mt-12 sm:h-32 sm:w-32" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-1/3 rounded bg-slate-700" />
                <div className="h-3.5 w-1/4 rounded bg-slate-700" />
              </div>
            </div>
          </div>
        ) : channelError ? (
          <p className="mt-16 text-center text-slate-300">{channelError}</p>
        ) : (
          channel && (
            <>
              <ChannelHeader
                channel={channel}
                isOwnChannel={channel.username === currentUsername}
                isSubscribed={isSubscribed}
                isSubscribeSubmitting={isSubscribeSubmitting}
                onToggleSubscribe={toggleSubscribe}
              />

              <ChannelVideoGrid
                videos={videos}
                isLoading={isVideosLoading}
                channelName={channel.fullName || channel.username}
              />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default ChannelView;
