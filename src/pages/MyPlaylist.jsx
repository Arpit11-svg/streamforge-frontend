import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaLayerGroup } from "react-icons/fa";
import { Button, Input } from "../components/ui";
import playlistService from "../services/playlist.service";
import PlaylistCard, {
  PlaylistCardSkeleton,
} from "../components/playlist/PlaylistCard";

function MyPlaylist() {
  const { userId } = useParams();

  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const currentUser = userData?.data;
  const isOwnPlaylists = currentUser?._id === userId;

  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ shouldFocusError: true });

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    playlistService
      .getUserPlaylists(userId)
      .then((response) => {
        setPlaylists(response.data.playlists);
      })
      .catch((err) => {
        console.error("Error fetching playlists:", err);
        setError("Couldn't load playlists right now.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAuthenticated, userId]);

  const onCreate = async (data) => {
    setCreateError("");
    setIsCreating(true);

    try {
      const response = await playlistService.createPlaylist({
        name: data.name,
        description: data.description,
      });

      const newPlaylist = { ...response.data, videoCount: 0, thumbnail: null };
      setPlaylists((prev) => [newPlaylist, ...prev]);
      reset();
      setIsFormOpen(false);
    } catch (err) {
      setCreateError(
        err.response?.data?.message || "Failed to create playlist.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-800 px-4">
        <div className="max-w-md rounded-2xl border border-slate-700 bg-slate-700/50 p-10 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
            <FaLayerGroup className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Sign in to see playlists
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Create and manage playlists to organize videos you want to watch
            again.
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
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isOwnPlaylists ? "My Playlists" : "Playlists"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {isOwnPlaylists
                ? "Organize your videos into collections."
                : "This channel's public playlists."}
            </p>
          </div>

          {isOwnPlaylists && (
            <button
              type="button"
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="shrink-0 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20 active:scale-95"
            >
              {isFormOpen ? "Cancel" : "Create Playlist"}
            </button>
          )}
        </div>

        {isFormOpen && (
          <div className="mt-6 rounded-2xl border border-slate-600/50 bg-slate-700/60 p-6">
            {createError && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {createError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onCreate)}
              className="flex flex-col gap-4"
            >
              <div>
                <Input
                  label="Playlist name"
                  placeholder="e.g. Watch later"
                  {...register("name", {
                    required: "Playlist name is required",
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Description"
                  placeholder="What's this playlist about?"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isCreating} className="sm:w-auto">
                {isCreating ? "Creating..." : "Create Playlist"}
              </Button>
            </form>
          </div>
        )}

        <div className="mt-8">
          {error ? (
            <p className="mt-16 text-center text-slate-300">{error}</p>
          ) : isLoading ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaylistCardSkeleton key={i} />
              ))}
            </div>
          ) : playlists.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-700/50 p-10 text-center">
              <h2 className="text-xl font-bold text-white">No playlists yet</h2>
              <p className="text-sm text-slate-400">
                {isOwnPlaylists
                  ? "You haven't created any playlists."
                  : "This channel hasn't created any playlists."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist._id} playlist={playlist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPlaylist;
