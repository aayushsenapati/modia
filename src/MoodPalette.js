import "./App.css";
import styled from "styled-components";


import {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useCallback,
  } from "react";

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
      transition: "background-color 1s ease, color 1s ease",
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
        styleMood.backgroundColor = "#fff494"; //yellow
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
        <h1 id="p1" style={{ margin: "0px", }}>
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
            top: "85%",
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
            left: "80%",
            top: "50%",
            textAlign:'left',
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

  
export default MoodPalette;