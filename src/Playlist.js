
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";


const PlayBox = styled.div`
    borderRadius : '10px',
    padding : 5px,
    margin : 20px,
    backgroundColor : black,
    color : white,
    width : 20vw,
    fontSize : 3vh
    `;

const PlayBoxParent = styled.div`
    display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  
    `;




function Playlist(props) {
    const [data, setData] = useState()
    useEffect(() => {
        let isMounted = true

        

        const getPlay = async () => {
            const { data } = await axios.post("http://127.0.0.1:5000/api/getPlay", {
                headers: {
                    "Content-Type": "application/json",
                },
                _id: props.ud.id,
            });
            console.log(data[0]);
            if (isMounted)
                setData(data)

        }

        if (!data && props.ud.id)
            getPlay()
    })

    

    
    return (

    <PlayBoxParent>
        {data ? data[0].playlists.map((playlist) => (
                <div key={playlist.playName} className='collapsed' style={{zIndex : "1", border : "2px solid", borderColor :"white", color : "white",borderRadius : '10px',padding : '5px',margin : '20px',backgroundColor : 'black',color : 'white',width : '20vw',fontSize : '3vh',height:'auto'}} 
                    onClick={(e)=>{e.currentTarget.lastChild.style.display=="none"? e.currentTarget.lastChild.style.display="inline":e.currentTarget.lastChild.style.display="none"}}>
                    <h5 style={{fontSize:"2vw"}} key={playlist.playName+" heading"}>{playlist.playName}</h5>
                    <div key={playlist.playName+" ul"} style={{display:"none"}}>
                        {playlist.tracks.map((song) => (
                            <h6 style={{fontSize:"1.5vw"}} key={song.track.name}>{song.track.name}</h6>
                        ))}
                    </div>
                </div>
        )) : <h6>No Playlist</h6>}</PlayBoxParent>
    );
}



export default Playlist;
