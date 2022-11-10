import logo from "./modia.png";
import "./App.css";

function Login() {
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
      )}&response_type=token&show_dialog=true`;
    };
  
    return (
      <div id="loginDiv">
        <img src={logo} alt="spotify" />
        <button onClick={handleClick}>Connect Spotify</button>
      </div>
    );
  }

export default Login;