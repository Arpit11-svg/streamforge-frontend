import React, { useState, useEffect } from "react";
import { Button, Input } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import videoService from "../services/video.service";
import { useSelector } from "react-redux";

function PublishVideo() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  if (!authStatus) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-400/20">
            <span className="text-3xl">🎥</span>
          </div>

          <h1 className="text-2xl font-bold text-white">
            Ready to share your video?
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in to your StreamForge account to upload and share your videos
            with the community.
          </p>

          {/* Login */}
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

          {/* Signup */}
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ shouldFocusError: true });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error || success) {
      window.scrollTo(0, 0);
    }
  }, [error, success]);

  const create = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoFile", data.videoFile[0]);
      if (data.thumbnail?.length > 0) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      await videoService.publishVideo(formData);

      setSuccess("🎉 Video published successfully!");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-600/50 bg-slate-700/60 p-10 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
        <h1 className="text-center text-4xl font-bold text-white">
          Publish a Video
        </h1>
        <p className="mt-3 text-center text-slate-400">
          Share your video with the world by filling out the details below.
        </p>

        <div className="my-8 h-px bg-linear-to-r from-transparent via-slate-500 to-transparent" />

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="flex flex-col gap-5">
          <div>
            <Input
              label="Video Title"
              placeholder="Enter video title"
              {...register("title", {
                required: "Video title is required",
              })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Video Description"
              placeholder="Enter video description"
              {...register("description", {
                required: "Video description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="file"
              accept="video/*"
              label="Video file"
              {...register("videoFile", {
                required: "Video file is required",
              })}
            />
            {errors.videoFile && (
              <p className="mt-1 text-sm text-red-400">
                {errors.videoFile.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="file"
              accept="image/*"
              label="Thumbnail image"
              {...register("thumbnail", {
                required: "Thumbnail image is required",
              })}
            />
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-400">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Publishing..." : "Publish Video"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PublishVideo;
