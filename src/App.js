import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from "react"

function App() {
  const CLIENT_ID="54c6d6c8a6f347ba9c4d03f1d5be8f3c"
  const REDIRECT_URI="http://localhost:3000"
  const AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE="token"
  const [token,setToken]=useState("")

  useEffect(()=>{
    const hash=window.location.hash
    let token=window.localStorage.getItem("token")

    if(!token&&hash){
      token=hash.substring(1).split("&").find(elem=>elem.startsWith("access_token")).split("=")[1]
      window.location.hash=""
      console.log(token)
      window.localStorage.setItem("token",token)
      setToken(token)
    }

  },[])
  

  return (
    <div class="App">
      <h1 id="p1">Modia</h1>
      {!token?<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>:<button>Logout</button>}
      

    </div>
  );
}

export default App;
