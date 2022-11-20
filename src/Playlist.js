import "./App.css";
import axios from "axios";
import {useState,useEffect} from "react";

function Playlist(props) {
    const [data,setData]=useState()



        const getPlay = async () =>
        {
            const { data } = await axios.post("http://127.0.0.1:5000/api/getPlay", {
                headers: {
                    "Content-Type": "application/json",
                },
                _id: props.ud.id,
            });
            console.log(data);  
            //  setData(data)
            
        }
        getPlay()
    
    return (
        <>
            
        </>
    );
}

export default Playlist;
