import "./App.css";


import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import MoodPalette from "./MoodPalette";
import Login from "./Login";
import Recommend from "./Recommend";
import Navigate from "./Navigate";
import Playlist from "./Playlist";



export function App() {

  const [token, setToken] = useState(window.sessionStorage.getItem("token"));
  const [clicked, setClicked] = useState(false);
  const [valence, setValence] = useState();
  const [energy, setEnergy] = useState();
  const [bgColor, setBgColor] = useState();
  const [color, setColor] = useState();
  const [term,setTerm]=useState("short_term")
  const [ud,setUd]=useState()
  let navigate = useNavigate();

  const getUserData = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log("user data:", data);
    setUd(data);
  };
  useEffect(() => {

    let hash = window.location.hash;

    if (hash) {
      const t = hash.substring(1).split("&")[0].split("=")[1];
      window.sessionStorage.setItem("token", t);
      setToken(t);
      
      
    }
    
    console.log(token)
    if (!token) {
      navigate("/login", { replace: true })
    }

    if (token) {
      if(!ud){
        getUserData()
      }
      if (!clicked) {
        navigate("/", { replace: true })
      }
      else {
        navigate("/rec", { replace: true })
      }
    }

    },[token,clicked,ud]);

    const logout = () => {
      window.sessionStorage.removeItem("token");
      setToken(window.sessionStorage.getItem("token"));
      navigate("/login", { replace: true })
    };


  const childState = (clicked, valence, energy,bgColor,color) => {
    setClicked(clicked); //function prop
    setValence(valence); //function prop
    setEnergy(energy); //function prop
    setBgColor(bgColor)
    setColor(color)
  };

  const termState = (term) => {
    setTerm(term)
  };

 

  const s1 = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });


  return(
    <div className="modia-webpage">

    {token?<Navigate logout = {logout}/> : <></>}
      <Routes>
        <Route path="/" exact element={<MoodPalette childState={childState} termState={termState} />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/rec" exact element={<Recommend valence={valence} energy={energy} bgColor={bgColor} color={color} term={term} ud={ud}/>}/>
        <Route path="/playlist" exact element={<Playlist ud={ud} />} />
      </Routes>
    </div>
  );


}




