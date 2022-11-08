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



export function App() {
  const [token, setToken] = useState("");
  const [clicked, setClicked] = useState(false);
  const [valence, setValence] = useState();
  const [energy, setEnergy] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const t = hash.substring(1).split("&")[0].split("=")[1];
      window.sessionStorage.setItem("token", t);
      window.location.assign("http://localhost:3000");

    }
    if (!token) {
      setToken(window.sessionStorage.getItem("token"));
    }
  }, []);


  useEffect(() => {
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
  }, [setToken,setClicked]);

  const childState = (clicked, valence, energy) => {
    setClicked(clicked); //function prop
    setValence(valence); //function prop
    setEnergy(energy); //function prop
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
      <h1>In App</h1>
      <Routes>
        <Route path="/" exact element={<MoodPalette childState={childState} />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/rec" exact element={<Recommend valence={valence} energy={energy} />} />
      </Routes>
    </>
  );


}




