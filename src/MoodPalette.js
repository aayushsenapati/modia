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
  // let navigate = useNavigate();
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
      height: "35vw",
      margin: 'auto',
      marginTop:"50px",
      borderRadius: "20px",
      border: "solid 3px",
      transition: "background-color 1s ease, color 1s ease",
      position: "relative",
      left: "0px",
      top: "0px",
    };

    if (y < -(height / width) * x + height && y > (height / width) * x) {
      styleMood.backgroundColor = "#3144b7"; //blue
      styleMood.color = "#9cf0e1";
    } //blue
    if (y < (height / width) * x && y < -(height / width) * x + height) {
      styleMood.backgroundColor = "#8bf677"; // green
      styleMood.color = "#7f14ff";
    } //green
    if (y > -(height / width) * x + height && y < (height / width) * x) {
      styleMood.backgroundColor = "#fff914"; //yellow
      styleMood.color = "#d9006a";
    } //yellow
    if (y > -(height / width) * x + height && y > (height / width) * x) {
      styleMood.backgroundColor = "#ff4e2a"; //red
      styleMood.color = "#290740";
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
      const updatec = (e) => {
        const offsets = ref.current.getBoundingClientRect();
        const energy = (1 / ref.current.offsetWidth) * (e.x - offsets.left); //div coords
        const valence = 1-(1 / ref.current.offsetHeight) * (e.y - offsets.top); //div coords
        console.log(valence, energy);
        props.childState(true, valence, energy,ref.current.style.backgroundColor,ref.current.style.color);
        console.log(ref.current.style.backgroundColor)
        console.log(ref.current.style.color)
      };


      ref.current.addEventListener("mousemove", update);
      ref.current.addEventListener("touchmove", update);
      ref.current.addEventListener("click", updatec);
      
    }, [setX, setY]);
  
    return (
      <>
      <div style = {{display : "flex", width : "100vw", justifyContent : "center", columnGap : "2vw",marginTop:"2vh"}}>
        <input id="short" type="radio" name="term" value="short_term" style={{display:"none"}} defaultChecked={true} onClick={(e)=>{props.termState(e.target.value);console.log(e.target.value)}}/>
        <label style = {{ width : "13vw", height : "6vh"}}for = "short">Short term</label>
        <input id="medium" type="radio" name="term" value="medium_term" style={{display:"none"}} onClick={(e)=>{props.termState(e.target.value);console.log(e.target.value)}}/>
        <label style = {{width : "13vw", height : "6vh"}}for = "medium">Medium term</label>
        <input id="long" type="radio" name="term" value="long_term" style={{display:"none"}} onClick={(e)=>{props.termState(e.target.value);console.log(e.target.value)}}/>
        <label style = {{width : "13vw", height : "6vh"}}for = "long">Long term</label>
      </div>
        <div id="moodPaletteDiv" style={styleMood} ref={ref}>
          <h1 id="p1" style={{ margin: "0px", fontSize:'4vw'}}>
            Modia
          </h1>
          <span
            style={{
              position: "absolute",
              top: "10%",
              fontSize: 1.5 + offSetYT + "vw",
            }}
          >
            Joyous
          </span>
          <span
            style={{
              position: "absolute",
              top: "85%",
              fontSize: 1.5 + offSetYB + "vw",
            }}
          >
            Gloomy
          </span>
          <span
            style={{
              position: "absolute",
              left: "10%",
              top: "50%",
              fontSize: 1.5 + offSetXL + "vw",
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
              fontSize: 1.5 + offSetXR + "vw",
            }}
          >
            Upbeat
          </span>
          
        </div>
      </>
    );
  }

  
export default MoodPalette;