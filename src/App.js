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
import { Routes, Route, Link, useNavigate } from "react-router-dom";

//Components
import MoodPalette from "./MoodPalette";
import Login from "./Login";
import Recommend from "./Recommend";
import Navigate from "./Navigate";



export function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem("token"));
  const [clicked, setClicked] = useState(false);
  const [valence, setValence] = useState();
  const [energy, setEnergy] = useState();
  const [bgColor, setBgColor] = useState();
  const [color, setColor] = useState();
  let navigate = useNavigate();

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

      if (!clicked) {
        navigate("/", { replace: true })
      }
      else {
        navigate("/rec", { replace: true })
      }
    }

    },[token,clicked]);


/*   useEffect(() => {
    if (token) {
      if (!clicked) {
        navigate("/", { repalce: true })
      }
      else {
        navigate("/rec", { repalce: true })
      }
    }
    else
      navigate("/login", { repalce: true })
  }, []); */

  const childState = (clicked, valence, energy,bgColor,color) => {
    setClicked(clicked); //function prop
    setValence(valence); //function prop
    setEnergy(energy); //function prop
    setBgColor(bgColor)
    setColor(color)

  };

  const s1 = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });




  /*
  if (token) {
    if (!clicked)
      return (
        <animated.div style={s1} id="moodPaletteParent">
          <MoodPalette childState={childState} />
        </animated.div>
      );
    else return <Recommend valence={valence} energy={energy} />;
  } else {*/
  return (
    // <animated.div style={s1} id="loginParent">
    //   <Login />
    // </animated.div>
    <>
    <Navigate/>
      <Routes>
        <Route path="/" exact element={<MoodPalette childState={childState} />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/rec" exact element={<Recommend valence={valence} energy={energy} bgColor={bgColor} color={color}/>} />
      </Routes>
    </>
  );


}




