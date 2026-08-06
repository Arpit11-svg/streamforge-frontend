const VideoPlayer = ({ videoUrl, thumbnailUrl }) => {
  return (
    <video
      src={videoUrl}
      poster={thumbnailUrl}
      controls
      className="w-full rounded-lg"
    />
  );
};

export default VideoPlayer;
