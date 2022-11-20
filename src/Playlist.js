
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const PlayBox = styled.div`
    display : inline-block;
    border-radius : 20px;
    padding : 5px;
    margin : 

    `;


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
        <>
            {data?data[0].playlists.map(playlist=><PlayBox>{playlist.playName}</PlayBox>):"N/A"}
        </>
    );
}

export default Playlist;
