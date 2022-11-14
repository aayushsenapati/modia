import "./App.css";

import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


function Recommend(props) {
  const [userData, setUserData] = useState(false);
  const [userTop, setUserTop] = useState(false);
  const [analData, setAnalData] = useState(false);
  const [token, setToken] = useState(window.sessionStorage.getItem("token"));
  const [playName,setPlayName]=useState()
  const [tracks,setTracks]=useState([])
  const refInput=useRef()
  const idArray = [];
  let navigate = useNavigate();



  const Container = styled.div`
      background-color: #121212;
      color:white;
      height : 100vh;
      width : 100vw;
      overflow-y: auto;
      display:flex;
      flex-flow:row wrap;
      justify-content: center;
      
    `;

  console.log("in Recommend", props.valence, props.energy);


 /*  const createPlay = async () => {
    const { data } = await axios.post("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log("user data:",data);
    setUserData(data);
  }; */
  const getUserData = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log("user data:",data);
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
          time_range: props.term,
          limit: 50,
        },
      }
    );
    console.log("User Top Data:",data);
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
    const tempTracks=tracks
    return objectArray.map((song) => (
      <div key={song.track.id} >
        <Slide onClick={()=>{tempTracks.includes(song)?tempTracks.splice(tempTracks.indexOf(song), 1):tempTracks.push(song);setTracks(tempTracks);console.log(tracks)}} style={{backgroundColor: props.bgColor, border: "10px solid",borderColor:'#121212', borderRadius: "23px"}}>
          <h3>{song.track.name}</h3>
          <img src={song.track.album.images[0].url} alt="image"></img>
        </Slide>
      </div>
    ));
  };
  const renderPlay = () => {
    return tracks.map((song) => (
      <div key={song.track.id} >
          <h6>{song.track.name}</h6>
      </div>
    ));
  };


  const releFunc = (object) => {
    return (
      Math.abs(props.valence - object.valence) +
      Math.abs(props.energy - object.energy)
    );
  };

  if (token) {
    if(!userData){
      getUserData()
    }
    if (!userTop) {
      getUserTop();
    } else {
      for (let i = 0; i < userTop.items.length; i++) {
        idArray.push(userTop.items[i].id);
      }
      console.log("ID ARRAY:",idArray);
      if (!analData) {
        getSongAnal();
      } else {
        var objectArray = userTop.items.map((x, i) => {
          analData.audio_features[i].track = x;
          return analData.audio_features[i];
        });
        objectArray.sort((a, b) => releFunc(a) - releFunc(b));
        console.log("ObjectArray:",objectArray);


        return (
          <Container>
            <div style={{margin:"100px"}}>
              <h6 style={{marginTop:"0px"}}>Valence:{props.valence}</h6>
              <h6>Energy:{props.energy}</h6>
              <h6>Color:{props.color}</h6>
              <h6>BGColor:{props.bgColor}</h6>
              <h6>Playlist Name:{playName}</h6>
              
            </div>

            <div>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={150}
                totalSlides={objectArray.length+4}
                visibleSlides={5}
              >
                <Slider style={{ backgroundColor:"#121212", color: props.color, width: "100vw", textAlign: "center", margin: "auto" }}>
                  <Slide/>
                  <Slide/>
                  {renderSongs()}
                  <Slide/>
                  <Slide/>
                </Slider>
                <div style={{background:"linear-gradient(to right,rgba(0,0,0,1), rgba(255,255,255,0))",position:'absolute',width:'40vw',height:'100%',top:'0'}}></div>
                <div style={{background:"linear-gradient(to left,rgba(0,0,0,1), rgba(255,255,255,0))",position:'absolute',width:'40vw',height:'100%',top:'0',left:'60vw'}}></div>
                <div id = "buttonContainer" style={{display:'flex',justifyContent:'center'}}>
                <ButtonBack id = "backnext" style = {{backgroundColor : props.color, color : props.bgColor, borderColor : props.bgColor, display:'inline-block',margin:'10px'}}>Back</ButtonBack>
                <ButtonNext id = "backnext" style = {{backgroundColor : props.color, color : props.bgColor, borderColor : props.bgColor, display:'inline-block',margin:'10px'}}>Next</ButtonNext>
                </div>
              </CarouselProvider>
            </div>
            
            <div style={{margin:"100px"}}>
              <label htmlFor="playInput">Enter playlist name: </label>
              <input id="playInput" type="text" ref={refInput}/>
              <button onClick={()=>{setPlayName(refInput.current.value);setTracks([])}}>Upload Playlist</button>
            </div>

          </Container>
        );
      }
    }
  }
}


export default Recommend;