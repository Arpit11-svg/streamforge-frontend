const VideoPlayer = ({ videoUrl, thumbnailUrl }) => {
  return (
    <video
      src={videoUrl}
      poster={thumbnailUrl}
      controls
      className="aspect-video w-full rounded-lg bg-black object-cover"
    />
  );
};

export default VideoPlayer;
