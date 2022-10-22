
import logo from "./modia.png";
import "./App.css";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";

function Login() {
  const handleClick = async () => {
    const client_id = "b10ac7cc459d474e961a6603c15da715";
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
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div>
      <img
        src={logo}
        alt="spotify"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  );
}

export default Login;
