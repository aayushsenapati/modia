import "./App.css";

import {
  useState,
  useRef,
  memo,
} from "react";
import axios from "axios";
import styled from "styled-components";
import React from 'react';  
import {Button} from "react-bootstrap";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Routes, Route, useNavigate } from "react-router-dom";


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
function propsAreEqual(prev, next) {
  console.log("rerender?")
  return (JSON.stringify(prev.objectArray) === JSON.stringify(next.objectArray)&&prev.color===next.color&&prev.bgColor===next.bgColor)
}

function SlideProvide(props){
  var tempTracks=[]

  const renderSongs = () => {
    tempTracks = Array.from(tempTracks)
    return props.objectArray.map((song) => (
      <div key={song.track.id} >
        <Slide
        onClick={(e) => {
          window.addEventListener('mousemove',()=>{return;})
          tempTracks.includes(song) ? tempTracks.splice(tempTracks.indexOf(song), 1) : tempTracks.push(song)
          e.currentTarget.style.transition="background-color 0.5s ease,color 0.5s ease";
          if(e.currentTarget.style.backgroundColor==props.bgColor)
          {
            e.currentTarget.style.backgroundColor=props.color
            e.currentTarget.style.color=props.bgColor
          }
          else
          {
            e.currentTarget.style.backgroundColor=props.bgColor
            e.currentTarget.style.color=props.color
          }
          props.slidePropFunc(tempTracks);console.log(tempTracks)
          }} 

        style={{ backgroundColor: props.bgColor, border: "10px solid", borderColor: '#121212', borderRadius: "23px" }}>

          <img src={song.track.album.images[0].url} alt="image" style={{width:'90%',height:'auto',paddingTop:'10px'}}></img>
          <h4  style={{fontSize : '2vw'}} >{song.track.name}</h4>
          <h5 style={{position:'absolute',marginLeft:'10px', fontSize : '1.5vw'}}>{song.track.artists[0].name}</h5>

        </Slide>
      </div>
    ));
  };
  return(
  <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={150}
                  totalSlides={props.objectArray.length + 4}
                  visibleSlides={5}
                >
                  <Slider  style={{ backgroundColor: "#121212", border: "5px solid", borderColor: props.color, color: props.color, width: "100vw", textAlign: "center", margin: "auto" }}>
                    <Slide />
                    <Slide />
                    {renderSongs()}
                    <Slide />
                    <Slide />
                  </Slider>
                  <div style={{ background: "linear-gradient(to right,rgba(18,18,18,1) 0%,rgba(18,18,18,1) 30%, rgba(18,18,18,0.8)60%, rgba(18,18,18,0.1) 95%, rgba(18,18,18,0) 100%)", position: 'absolute', width: '40vw', height: '100%', top: '0' }}></div>
                  <div style={{ background: "linear-gradient(to left,rgba(18,18,18,1) 0%,rgba(18,18,18,1) 30%, rgba(18,18,18,0.8)60%, rgba(18,18,18,0.1) 95%, rgba(18,18,18,0) 100%)", position: 'absolute', width: '40vw', height: '100%', top: '0', left: '60vw' }}></div>
                  <div id="buttonContainer" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonBack id="backnext" style={{width : '9vw', height : '8vh', fontSize : '1.8vw', backgroundColor: props.color, color: props.bgColor, borderColor: props.bgColor, display: 'inline-block', margin: '10px' }}>Back</ButtonBack>
                    <ButtonNext id="backnext" style={{width : '9vw', height : '8vh', fontSize : '1.8vw', backgroundColor: props.color, color: props.bgColor, borderColor: props.bgColor, display: 'inline-block', margin: '10px' }}>Next</ButtonNext>
                  </div>
  </CarouselProvider>)
}


const MemoSlideProvide=memo(SlideProvide,propsAreEqual)

function Recommend(props) {
  const [userTop, setUserTop] = useState(false);
  const [analData, setAnalData] = useState(false);
  const [token, setToken] = useState(window.sessionStorage.getItem("token"));
  const [playName, setPlayName] = useState()
  const refInput = useRef(null)
  const [playArr,setPlayArr]=useState([])
  const [staged,setStaged]=useState(false)
  const idArray = [];
  let navigate = useNavigate();
  





  
  console.log("parent render!")


  const slidePropFunc=(songArr)=>{
    setPlayArr(songArr)
  }

  function dispPlay(){
    return(
    <>
      {playArr.map((song) => 
      (
        <h6 key={song.track.id}>{song.track.name}</h6>
      ))}
    </>)
  }


  console.log("in Recommend", props.valence, props.energy);


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
    console.log("User Top Data:", data);
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

  const uploadPlay=async ()=>{
    const {data}=await axios.post("http://127.0.0.1:5000/api/storePlay",
    {
      headers: {
        "Content-Type": "application/json",
      },
      _id:props.ud.id,
      playName:playName,
      tracks:playArr
    }
    )
    console.log(data)
    navigate("/playlist", { replace: true })
  }
  


  

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
      console.log("ID ARRAY:", idArray);
      if (!analData) {
        getSongAnal();
      } else {
        var objectArray = userTop.items.map((x, i) => {
          analData.audio_features[i].track = x;
          return analData.audio_features[i];
        });
        objectArray.sort((a, b) => releFunc(a) - releFunc(b));
        console.log("ObjectArray:", objectArray);


        

        


        return (
            <Container>
              <div style={{ margin: "100px" }}>
                <h6 style={{ marginTop: "0px" }}>Valence:{props.valence}</h6>
                <h6>Energy:{props.energy}</h6>
                <h6>Color:{props.color}</h6>
                <h6>BGColor:{props.bgColor}</h6>
              </div>

              <div>
                <MemoSlideProvide color={props.color} bgColor={props.bgColor} objectArray={objectArray} slidePropFunc={slidePropFunc}/>
              </div>

              <div style={{ margin: "100px" }}>
                <label htmlFor="playInput">Enter playlist name: </label>
                <input id="playInput" type="text" ref={refInput} />
                <Button variant="outline-light" style = {{margin : "5px"}}onClick={() => { setPlayName(refInput.current.value);setStaged(true)}}>Stage Playlist</Button>{' '}
                {/*<button onClick={() => { setPlayName(refInput.current.value);setStaged(true)}}>Stage Playlist</button>*/}
                <h3>{playName}</h3>
                {staged?dispPlay():<></>}
                
                {staged?<Button variant="outline-secondary" onClick={() => {playArr.length&&refInput.current.value.length ? uploadPlay() : window.alert("Select some songs or enter playlist name!");}}>Upload Playlist</Button>:<></>}
                
              </div>

            </Container>
          
        );
      }
    }
  }
}







export default Recommend;