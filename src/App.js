import logo from "./modia.png";
import "./App.css";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";

export function App() {
  const [token, setToken] = useState("");


  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const t = hash.substring(1).split("&")[0].split("=")[1];
      window.localStorage.setItem("token",t)
      window.location.assign("http://localhost:3000");
    }
    if(!token)
    {
      setToken(window.localStorage.getItem("token"))
      console.log(token);
    }
  }, []);


  return(
    <div><Login/></div>
  )


}

function Login(){
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
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`
  }


  return (
    <div>
      <img src={logo} alt="spotify" />
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  );
}

function moodPalette(){
  const [x, setX] = useState()
  const [y, setY] = useState()
  const[width,setWidth]=useState()
  const[height,setHeight]=useState()

  let styleMood = {
    width:"100vw",
    height:"100vh",
    transition:"background-color 1s ease, color 1s ease",
    
  }
}