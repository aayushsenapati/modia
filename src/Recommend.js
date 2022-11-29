

import {
  useState,
  useRef,
  memo,
  useContext,
  useEffect
} from "react";
import axios from "axios";
import styled from "styled-components";
import React from 'react';
import { Button } from "react-bootstrap";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useNavigate } from "react-router-dom";
import backArrow from "./back-button.svg"
import nextArrow from "./next-button.svg"
import { MDBInput } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';



function propsAreEqual(prev, next) {
  console.log("rerender?")
  return (JSON.stringify(prev.objectArray) === JSON.stringify(next.objectArray) && prev.color === next.color && prev.bgColor === next.bgColor)
}

function SlideProvide(props) {
  var tempTracks = []

  function renderSongs() {
    tempTracks = Array.from(tempTracks);
    return props.objectArray.map((song) => (
      <div key={song.track.id}>
        <Slide
          index={song.index}
          onDoubleClick ={(e) => {
            tempTracks.includes(song) ? tempTracks.splice(tempTracks.indexOf(song), 1) : tempTracks.push(song);
            e.currentTarget.style.transition = "background-color 0.5s ease,color 0.5s ease";
            if (e.currentTarget.style.backgroundColor == props.bgColor) {
              e.currentTarget.style.backgroundColor = props.color;
              e.currentTarget.style.color = props.bgColor;
            }
            else {
              e.currentTarget.style.backgroundColor = props.bgColor;
              e.currentTarget.style.color = props.color;
            }
            props.slidePropFunc(tempTracks); console.log(tempTracks);
          }}

          style={{ backgroundColor: props.bgColor, border: "10px solid", borderColor: '#202020', borderRadius: "2.3vw" }}>

          <img src={song.track.album.images[0].url} alt="image" style={{ width: '90%', height: 'auto', marginTop: '1vw', borderRadius: '1.5vw' }}></img>
          <h4 style={{ fontSize: '1.8vw', height: '3.6vw', marginTop: '0.3vw' }} >{song.track.name.length > 30 ? song.track.name.slice(0, 27) + '...' : song.track.name}</h4>
          <h5 style={{ position: 'absolute', marginLeft: '10px', fontSize: '1.3vw', marginTop: '0.5vw' }}>{song.track.artists[0].name}</h5>

        </Slide>
      </div>
    ));
  }
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={props.objectArray.length + 4}
      visibleSlides={5}
    >
      <Slider style={{ backgroundColor: "#202020", border: "5px solid", borderColor: props.color, color: props.color, width: "100vw", textAlign: "center", margin: "auto" }}>
        <Slide />
        <Slide />
        {renderSongs()}
        <Slide />
        <Slide />
      </Slider>
      <div style={{ background: "linear-gradient(to right,rgba(32,32,32,1) 0%,rgba(32,32,32,1) 30%, rgba(32,32,32,0.8)60%, rgba(32,32,32,0.1) 95%, rgba(32,32,32,0) 100%)", position: 'absolute', width: '40vw', height: '100%', top: '0' }}></div>
      <div style={{ background: "linear-gradient(to left,rgba(32,32,32,1) 0%,rgba(32,32,32,1) 30%, rgba(32,32,32,0.8)60%, rgba(32,32,32,0.1) 95%, rgba(32,32,32,0) 100%)", position: 'absolute', width: '40vw', height: '100%', top: '0', left: '60vw' }}></div>

      <ButtonBack style={{ background: 'none', border: 'none', height: '4vw', width: '4vw', position: 'absolute', top: '50%', left: '32%' }}><img src={backArrow} style={{ width: '4vw', height: 'auto' }} alt="not found" /></ButtonBack>
      <ButtonNext style={{ background: 'none', border: 'none', height: '4vw', width: '4vw', position: 'absolute', top: '50%', left: '62%' }}><img src={nextArrow} style={{ width: '4vw', height: 'auto' }} alt="Not Found" /></ButtonNext>
    </CarouselProvider>)
}


const MemoSlideProvide = memo(SlideProvide, propsAreEqual)

function Recommend(props) {
  const [userTop, setUserTop] = useState(false);
  const [analData, setAnalData] = useState(false);
  const [token, setToken] = useState(window.sessionStorage.getItem("token"));
  const [playName, setPlayName] = useState()
  const refInput = useRef(null)
  const [playArr, setPlayArr] = useState([])
  const [staged, setStaged] = useState(false)
  const [reRender, setReRender] = useState(false)
  const idArray = [];
  let navigate = useNavigate();







  console.log("parent render!")


  const slidePropFunc = (songArr) => {
    setPlayArr(songArr)
  }

  function dispPlay() {
    return (
      <>
        {playArr.map((song) =>
        (
          <h6 style={{ color: "white" }} key={song.track.id}>{song.track.name}</h6>
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

  const uploadPlay = async () => {
    const { data } = await axios.post("http://127.0.0.1:5000/api/storePlay",
      {
        headers: {
          "Content-Type": "application/json",
        },
        _id: props.ud.id,
        playName: playName,
        tracks: playArr
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
          <>
            <div style={{ margin: "100px", color: "white",display:'none'}}>
              <h6 style={{ marginTop: "0px", color: "white" }}>Valence:{props.valence}</h6>
              <h6 style={{ color: "white" }}>Energy:{props.energy}</h6>
              <h6 style={{ color: "white" }}>Color:{props.color}</h6>
              <h6 style={{ color: "white" }}>BGColor:{props.bgColor}</h6>
            </div>

            <div style={{marginTop:'4vw'}}>
              <MemoSlideProvide color={props.color} bgColor={props.bgColor} objectArray={objectArray} slidePropFunc={slidePropFunc} />
            </div>

            <div style={{ margin: "2vw" }}>
            <input id="playInput" type="text" label="Enter playlist name" ref={refInput} style={{width:"15vw"}}/>
              <Button variant="outline-light" style={{ margin: "5px" }} onClick={() => {
              if(refInput.current.value.length){
              setPlayName(refInput.current.value)
              setStaged(true)
              }
              else{
              window.alert("Enter playlist name!")}
              reRender ? setReRender(false) : setReRender(true) }}>Stage Playlist</Button>{' '}

              {staged? <div>

                <h3 style={{ color: "white" }}>{playName}</h3>
                <hr style={{ color: "white" }} />
                {dispPlay()}
                <hr style={{ color: "white" }} />
              </div> : <></>
              }

              {staged ? <Button variant="outline-secondary" onClick={() => { playArr.length ? uploadPlay() : window.alert("Select some songs!"); }}>Upload Playlist</Button> : <></>}

            </div>

          </>

        );
      }
    }
  }
}







export default Recommend;