import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playlistService from "../services/playlist.service";

function CurrentPlaylist() {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    playlistService
      .getPlaylistById(playlistId)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playlistId]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {" "}
      <h1>{playlist.name || "PlaylistDemo"}</h1>{" "}
      <p> {playlist.description || "This is demo description"} </p>{" "}
      {playlist.owner ? (
        <div>
          {" "}
          <h3>Owner</h3> <p>Name: {playlist.owner.fullName}</p>{" "}
          <p>Username: @{playlist.owner.username}</p>{" "}
          {playlist.owner.avatar?.url && (
            <img
              src={playlist.owner.avatar.url}
              alt={playlist.owner.username}
              width="100"
            />
          )}{" "}
        </div>
      ) : (
        <p>Unknown user</p>
      )}{" "}
      <h3>Videos</h3>{" "}
      {playlist.videos.length > 0 ? (
        playlist.videos.map((video) => (
          <div key={video._id}> {video.title} </div>
        ))
      ) : (
        <p>No videos in this playlist.</p>
      )}{" "}
    </div>
  );
}

export default CurrentPlaylist;
