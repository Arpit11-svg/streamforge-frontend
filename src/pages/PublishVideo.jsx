import React, { useState } from "react";
import { Button, Input } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import videoService from "../services/video.service";

function PublishVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const create = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try{

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
            navigate("/"); // Redirect to home page after 3 seconds
        }, 3000);

    }
    catch(err){
        setError(err.response?.data?.message || "Something went wrong.");
    }
    finally{
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
