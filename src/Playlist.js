
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";


const PlayBox = styled.div`
    display : flex;
    flex-wrap: wrap;
    flex-basis : 200px;
    flex-direction:column;
    justify-content : center;
    border-radius : 20px;
    padding : 5px;
    margin : 20px;
    background-color : black;
    color : white;
    width : 20vw;
    font-size : 3vh;


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

    <>
        {data ? data[0].playlists.map((playlist) => (
            <PlayBox style = {{zIndex : "1", backgroundColor : "black", border : "2px solid", borderColor :"white", color : "white"}} key={playlist.playName+" playBox"}>
                <div key={playlist.playName} style={{transition:"all 0.5s ease"}} onClick={(e)=>{e.currentTarget.lastChild.style.display=="none"?e.currentTarget.lastChild.style.display="inline":e.currentTarget.lastChild.style.display="none"}}>
                    <h6 key={playlist.playName+" heading"}>{playlist.playName}</h6>
                    <ul key={playlist.playName+" ul"} style={{display:"none"}}>
                        {playlist.tracks.map((song) => (
                            <li key={song.track.name}>{song.track.name}</li>
                        ))}
                    </ul>
                </div>
            </PlayBox>
        )) : <h6>No Playlist</h6>}</>
    );
}



export default Playlist;
