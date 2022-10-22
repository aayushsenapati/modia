import logo from './logo.svg';
import './App.css';
import {useEffect,useState,useRef,useLayoutEffect} from "react";
import axios from "axios"



function App() {
  const CLIENT_ID="54c6d6c8a6f347ba9c4d03f1d5be8f3c"
  const CLIENT_SECRET="085c8707b2ab4780bc9220b1bc4fa480"
  const REDIRECT_URI="http://localhost:3000"
  const AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE="code"
  const [token,setToken]=useState("")
  const [x, setX] = useState()
  const [y, setY] = useState()
  const ref = useRef(null);
  const[width,setWidth]=useState()
  const[height,setHeight]=useState()
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])




  let styleAppDiv = {
    width:"100%",
    height:"100%",
    transition:"background-color 1s ease, color 1s ease",
    
  }
  if (y< (-(height/width)*x+height) && y>(height/width)*x) {styleAppDiv.backgroundColor="rgb(100,149,237)";styleAppDiv.color="rgb(237,189,100)"}//blue
  if (y<(height/width)*x && y< (-(height/width)*x+height)) {styleAppDiv.backgroundColor="rgb(80,200,120)";styleAppDiv.color="rgb(200,10,92)"}//green
  if (y>(-(height/width)*x+height) && y<(height/width)*x) {styleAppDiv.backgroundColor="rgb(255,195,0)";styleAppDiv.color="rgb(0,59,255)"}//yellow
  if (y> (-(height/width)*x+height) && y>(height/width)*x) {styleAppDiv.backgroundColor="rgb(227,11,92)";styleAppDiv.color="rgb(11,227,148)"}//red


  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
    //console.log(width,height)
  });

  useEffect(() => {
      const update = (e) => {
        setX(e.x)
        setY(e.y)
      }
      console.log(width,height)
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    },
    [setX, setY]
  )

  useEffect(()=>{
    const hash=window.location.search
    console.log(hash)
    let token=window.localStorage.getItem("token")

    if(!token&&hash){
      token=hash.split("=")[1]
      window.location.assign("http://localhost:3000")
      console.log(token)
      window.localStorage.setItem("token",token)
      setToken(token)
    }

  },[])
  const logout=()=>{
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
}
  const getTopSongs = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
            Authorization: `Bearer ${token}`
            
        },
        
    })

    setSongs(data.tracks.items)
}


const renderArtists = () => {
  return artists.map(artist => (
      <div key={artist.id}>
          {artist.images.length ? <img width={"200px"} height={"200px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
      </div>
  ))
}
const renderSongs = () => {
  return songs.map(song => (
      <div key={song.id}>
          {song.name}
      </div>
  ))
}



  return (
    <div className="App" style={styleAppDiv} ref={ref}>
      <h1 id="p1" style={{margin:'0px'}}>Modia</h1>
      {console.log(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing%20user-top-read`)}
      {!token?<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing%20user-top-read`}>Login to Spotify</a> :<button onClick={logout}>Logout</button>}
      <h1>{`x: ${x}; y: ${y};`}{width};{height}</h1>
      
      <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
        <button type={"submit"}>Search</button>
      </form>
        <input type="button" onClick={getTopSongs}/>
      {renderArtists()}
      {renderSongs()}

    </div>
  );
}

export default App;
