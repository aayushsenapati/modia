
import logo from "./modia.png";
import "./App.css";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";




export function Login() {


  const handleClick = async () => {
    const client_id = "54c6d6c8a6f347ba9c4d03f1d5be8f3c";
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
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  };



  const [token,setToken]=useState("")
  
  useEffect(()=>{
    const hash=window.location.hash
    if(hash&&!token)
    {
      const token=hash.substring(1).split("&")[0].split("=")[1]
      setToken(token)
      window.location.assign("http://localhost:3000")
    }
    
  },[])
  
  console.log(token)



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

