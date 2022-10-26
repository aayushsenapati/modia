import logo from "./modia.png";
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
import styled from "styled-components";

export function App() {
  const [token, setToken] = useState("");
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const t = hash.substring(1).split("&")[0].split("=")[1];
      window.localStorage.setItem("token", t);
      window.location.assign("http://localhost:3000");
    }
    if (!token) {
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  const childState = (e) => setClicked(e); //function prop

  const s1 = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });

  if (token) {
    if (!clicked)
      return (
        <animated.div style={s1} id="moodPaletteParent">
          <MoodPalette childState={childState} />
        </animated.div>
      );
    else return <Recommend />;
  } else {
    return (
      <animated.div style={s1} id="loginParent">
        <Login />
      </animated.div>
    );
  }
}

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

function MoodPalette(props) {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const ref = useRef(null);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  //const [clicked, setClicked] = useState(false);

  let styleMood = {
    width: "75vw",
    height: "75vh",
    borderRadius: "5px",
    transition: "background-color 0.8s ease, color 0.8s ease",
  };

  if (y < -(height / width) * x + height && y > (height / width) * x) {
    styleMood.backgroundColor = "rgb(100,149,237)";
    styleMood.color = "rgb(237,189,100)";
  } //blue
  if (y < (height / width) * x && y < -(height / width) * x + height) {
    styleMood.backgroundColor = "rgb(80,200,120)";
    styleMood.color = "rgb(200,10,92)";
  } //green
  if (y > -(height / width) * x + height && y < (height / width) * x) {
    styleMood.backgroundColor = "rgb(255,195,0)";
    styleMood.color = "rgb(0,59,255)";
  } //yellow
  if (y > -(height / width) * x + height && y > (height / width) * x) {
    styleMood.backgroundColor = "rgb(227,11,92)";
    styleMood.color = "rgb(11,227,148)";
  } //red

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
    //console.log(width,height)
  });

  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    const updatec = (e) => {
      props.childState(true);
    };
    ref.current.addEventListener("mousemove", update);
    ref.current.addEventListener("touchmove", update);
    ref.current.addEventListener("click", updatec);
    /*     return () => {
      ref.current.removeEventListener("mousemove", update);
      ref.current.removeEventListener("touchmove", update);
    }; */
  }, [setX, setY]);
  return (
    <div id="moodPaletteDiv" style={styleMood} ref={ref}>
      <h1 id="p1" style={{ margin: "0px" }}>
        Modia
      </h1>
      <h1>
        {`x: ${x}; y: ${y};`}
        {width};{height}
      </h1>
    </div>
  );
}

function Recommend() {
  //const [userData, setUserData] = useState(false);
  const [userTop, setUserTop] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const Container = styled.div`
    background-color: white;
  `;

  //const token = window.localStorage.getItem("token");

/*   const getUserInfo = async () => {
    
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log(data)
    setUserData(data)
  }; */
  
  const getUserTop = async () => {
    
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      params:{
        time_range:"medium_term"
      }
    });
    console.log(data)
    setUserTop(data)
  };


  const logout=()=>{
    window.localStorage.removeItem("token")
    setToken(window.localStorage.getItem("token"))
  }
  

  if(token){
    if(!userTop)
      getUserTop()
    return (
    <Container>
      {!userTop?"":userTop.items[0].name}
      <button onClick={logout}>logout</button>
    </Container>
    )
    }

  else{
    return <App/>
  }
}

