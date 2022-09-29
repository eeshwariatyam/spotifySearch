import React from 'react';
import '../App.css';

export default function login() {
    const handleClick = async () => {
        const client_id = "09a7bb165de7480085c6cb6710e6c303";// unique id given by spotify
        const redirect_uri = "http://localhost:3000";
        const api_uri = "https://accounts.spotify.com/authorize";
        const scope = [
          "user-read-private",
          "user-read-email",
          "user-modify-playback-state",
          "user-read-playback-state",
          "user-read-currently-playing",
          "user-read-recently-played",
          "user-top-read",
        ];//thses scope are given in doc in spotify website
        window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
          " "
        )}&response_type=token&show_dialog=true`;
      };
  return (
    <div className="Slogo">
       <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick}>Connect Spotify for board infinity :)</button>
        
    </div>
  )
}
