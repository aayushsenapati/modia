import logo from './logo.svg';
import './App.css';
import {useEffect,useState,useRef,useLayoutEffect} from "react"



function App() {
  const CLIENT_ID="54c6d6c8a6f347ba9c4d03f1d5be8f3c"
  const REDIRECT_URI="http://localhost:3000"
  const AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE="token"
  const [token,setToken]=useState("")
  const [x, setX] = useState()
  const [y, setY] = useState()
  const ref = useRef(null);
  const[width,setWidth]=useState()
  const[height,setHeight]=useState()
  let styleAppDiv = {
    width:"100%",
    height:"100%"
  }
  if (y< (-(height/width)*x+height) && y>(height/width)*x) styleAppDiv.backgroundColor="rgb(0,0,255)"
  if (y<(height/width)*x && y< (-(height/width)*x+height)) styleAppDiv.backgroundColor="rgb(0,255,0)"
  if (y>(-(height/width)*x+height) && y<(height/width)*x) styleAppDiv.backgroundColor="rgb(255,255,0)"
  if (y> (-(height/width)*x+height) && y>(height/width)*x) styleAppDiv.backgroundColor="rgb(255,0,0)"

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
  const logout=()=>{
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div class="App" style={styleAppDiv} ref={ref}>
      <h1 id="p1">Modia</h1>
      {!token?<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>:<button onClick={logout}>Logout</button>}
      <h1>{`x: ${x}; y: ${y};`}{width};{height}</h1>

    </div>
  );
}

export default App;
