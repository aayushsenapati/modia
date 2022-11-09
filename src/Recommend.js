import {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useCallback,
  } from "react";
  import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


function Recommend(props) {
    const [userData, setUserData] = useState(false);
    const [userTop, setUserTop] = useState(false);
    const [analData, setAnalData] = useState(false);
    const [token, setToken] = useState(window.sessionStorage.getItem("token"));
    const idArray = [];
    let navigate = useNavigate();
  
    const Container = styled.div`
      background-color: white;
    `;

    console.log("in Recommend",props.valence,props.energy);
  
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
      navigate("/login", { replace: true })
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
              <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={150}
        totalSlides={4}
          >
           
        <Slider style = {{backgroundColor : "black", color : "white", width : "200px", textAlign : "center", margin : "auto", borderRadius : "10px"}}>
          <Slide index={0}><h1>{objectArray[0].track.name}</h1></Slide>
          <Slide index={1}><h1>{objectArray[1].track.name}</h1></Slide>
          <Slide index={2}><h1>{objectArray[2].track.name}</h1></Slide>
          <Slide index={3}><h1>{objectArray[3].track.name}</h1></Slide>
        </Slider>
      
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
              {renderSongs()}
              <button onClick={logout}>logout</button>
            </Container>
          );
        }
      }
    }
  }


  export default Recommend;