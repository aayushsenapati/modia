import {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useCallback,
  } from "react";
import axios from "axios";
import styled from "styled-components";



function Recommend(props) {
    const [userData, setUserData] = useState(false);
    const [userTop, setUserTop] = useState(false);
    const [analData, setAnalData] = useState(false);
    const [token, setToken] = useState(window.sessionStorage.getItem("token"));
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
      window.sessionStorage.removeItem("token");
      setToken(window.sessionStorage.getItem("token"));
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
      // return <App />;
      <h1>NO Value Recieved</h1>
    }
  }


  export default Recommend;