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
  const [valence, setValence] = useState();
  const [energy, setEnergy] = useState();
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

  if (token) {
    if (!clicked)
      return (
        <animated.div style={s1} id="moodPaletteParent">
          <MoodPalette childState={childState} />
        </animated.div>
      );
    else return <Recommend valence={valence} energy={energy} />;
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
  const [offSetXL, setOffSetXL] = useState(0);
  const [offSetXR, setOffSetXR] = useState(0);
  const [offSetYT, setOffSetYT] = useState(0);
  const [offSetYB, setOffSetYB] = useState(0);

  let styleMood = {
    width: "75vw",
    height: "85vh",
    borderRadius: "20px",
    border: "solid 3px black",
    transition: "background-color 0.8s ease, color 0.8s ease",
    position: "relative",
    left: "0px",
    top: "0px",
  };

  if (y < -(height / width) * x + height && y > (height / width) * x) {
    styleMood.backgroundColor = "#5DB7EA"; //blue
    styleMood.color = "rgb(237,189,100)";
  } //blue
  if (y < (height / width) * x && y < -(height / width) * x + height) {
    styleMood.backgroundColor = "#6fffa9"; // green
    styleMood.color = "rgb(200,10,92)";
  } //green
  if (y > -(height / width) * x + height && y < (height / width) * x) {
    styleMood.backgroundColor = "#fff494"; //yello
    styleMood.color = "rgb(0,59,255)";
  } //yellow
  if (y > -(height / width) * x + height && y > (height / width) * x) {
    styleMood.backgroundColor = "#fb7890"; //red
    styleMood.color = "#31ba02";
  } //red

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  useEffect(() => {
    const update = (e) => {
      const offset = ref.current.getBoundingClientRect();
      setX(e.x - offset.left);
      setY(e.y - offset.top);
      const offsets = ref.current.getBoundingClientRect();
      setOffSetXL(
        e.x - offsets.left < ref.current.offsetWidth / 2
          ? (1.5 / (ref.current.offsetWidth / 2)) *
              (ref.current.offsetWidth / 2 - (e.x - offsets.left))
          : 0
      );
      setOffSetXR(
        e.x - offsets.left > ref.current.offsetWidth / 2
          ? (1.5 / (ref.current.offsetWidth / 2)) *
              ((e.x - offsets.left) - ref.current.offsetWidth / 2)
          : 0
      );
      setOffSetYT(
        e.y - offsets.top < ref.current.offsetHeight / 2
          ? (1.5 / (ref.current.offsetHeight / 2)) *
              (ref.current.offsetHeight / 2 - (e.y - offsets.top))
          : 0
      );
      setOffSetYB(
        e.y - offsets.left > ref.current.offsetHeight / 2
          ? (1.5 / (ref.current.offsetHeight / 2)) *
              ((e.y - offsets.top) - ref.current.offsetHeight / 2)
          : 0
      );
    };
    /*     if(!width && !height){
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight); 
    }
    */
    const updatec = (e) => {
      const offsets = ref.current.getBoundingClientRect();
      const valence = (1 / ref.current.offsetWidth) * (e.x - offsets.left); //div coords
      const energy = (1 / ref.current.offsetHeight) * (e.y - offsets.top); //div coords
      console.log(valence, energy);
      props.childState(true, valence, energy);
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
      <span
        style={{
          position: "absolute",
          top: "10%",
          fontSize: 1.5 + offSetYT + "em",
        }}
      >
        Somber
      </span>
      <span
        style={{
          position: "absolute",
          top: "90%",
          fontSize: 1.5 + offSetYB + "em",
        }}
      >
        Joyous
      </span>
      <span
        style={{
          position: "absolute",
          left: "10%",
          top: "50%",
          fontSize: 1.5 + offSetXL + "em",
        }}
      >
        Mellow
      </span>
      <span
        style={{
          position: "absolute",
          left: "90%",
          top: "50%",
          fontSize: 1.5 + offSetXR + "em",
        }}
      >
        Upbeat
      </span>
      <h4 style={{ position: "absolute", left: "2%", top: "90%" }}>
        {`x: ${x}; y: ${y};`}
        {width};{height}
      </h4>
    </div>
  );
}

function Recommend(props) {
  const [userData, setUserData] = useState(false);
  const [userTop, setUserTop] = useState(false);
  const [analData, setAnalData] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const idArray = [];

  const Container = styled.div`
    background-color: white;
  `;

  //const token = window.localStorage.getItem("token");

  const getUserInfo = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    setUserData(data);
  };

  const getUserTop = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        params: {
          time_range: "short_term",
          limit: 50,
        },
      }
    );
    console.log(data);
    setUserTop(data);
  };

  const getSongAnal = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/audio-features",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        params: {
          ids: idArray.join(","),
        },
      }
    );
    console.log(data);
    setAnalData(data);
  };

  const renderSongs = () => {
    return objectArray.map((song) => (
      <div key={song.track.id}>
        <h4>
          {song.track.name}:{releFunc(song)}
        </h4>
      </div>
    ));
  };
  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(window.localStorage.getItem("token"));
  };

  const releFunc = (object) => {
    return (
      Math.abs(props.valence - object.valence) +
      Math.abs(props.energy - object.energy)
    );
  };

  if (token) {
    if (!userTop) {
      getUserTop();
    } else {
      for (let i = 0; i < userTop.items.length; i++) {
        idArray.push(userTop.items[i].id);
      }
      console.log(idArray);
      if (!analData) {
        getSongAnal();
      } else {
        var objectArray = userTop.items.map((x, i) => {
          analData.audio_features[i].track = x;
          return analData.audio_features[i];
        });
        objectArray.sort((a, b) => releFunc(a) - releFunc(b));
        console.log(objectArray);
        return (
          <Container>
            <h1>Valence:{props.valence}</h1>
            <h1>Energy:{props.energy}</h1>
            {renderSongs()}
            <button onClick={logout}>logout</button>
          </Container>
        );
      }
    }
  } else {
    return <App />;
  }
}
