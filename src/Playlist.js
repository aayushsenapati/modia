import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";


function Playlist(props) {
    const [data, setData] = useState()
    useEffect(() =>{
        let isMounted = true
    


    const getPlay = async () => {
        const { data } = await axios.post("http://127.0.0.1:5000/api/getPlay", {
            headers: {
                "Content-Type": "application/json",
            },
            _id: props.ud.id,
        });
        console.log(data[0]);
        if(isMounted)
            setData(data)

    }

    if (!data)
        getPlay()
    })

    return (
        
        data?data[0].playlists.map((playlist) => (
                <>
                <h6 key={playlist.playName}>{playlist.playName}</h6>
                <ul>
                    {playlist.tracks.map((song)=>(
                        <li>{song.track.name}</li>
                    ))}
                </ul>
                </>
            )):<h6>No Playlist</h6>
    );
}

export default Playlist;
