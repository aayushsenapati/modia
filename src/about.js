import "./App.css";
import backg from "./webgang.jpeg"



export function About() {
    const NameStyle = {
        fontSize : "1vw",
        backgroundColor : "white",
        borderRadius : "10px",
        color : "black",
        padding : "0.6vw",
        marginLeft : "5vw",
        marginRight : "5vw"

    }
    return(   
    <>
        <img src={backg} alt="err" style={{width:'100vw',height:'auto', opacity : "0.5", position : "sticky", top : "1vw", backgroundColor : "white", zIndex : "1"}}/>  


    <div style = {{position : "relative", backgroundColor : "#202020", width : "100vw", height : "1000px", zIndex : "2", borderRadius : "10px"}}>
        <h1 style = {{color : "white", textAlign : "center"}}>Devs</h1><hr style = {{color : "white"}}/>
        <div style = {{display : "flex", justifyContent : "center"}}>
        <span style = {NameStyle}>Aadithya H Rao</span>
        <span style = {NameStyle}>Aayush Nagar</span>
        <span style = {NameStyle}>Aayush Senapati</span>
        </div>


        

    </div>
    </>
    )
}



export default About;