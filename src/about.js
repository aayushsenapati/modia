import "./App.css";
import backg from "./webgang.jpeg"



export function About() {
    const NameStyle = {
        fontSize : "1.5vw",
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
        <span style = {NameStyle}>Aayush Nagar</span>
        <span style = {NameStyle}>Aayush Senapati</span>
        <span style = {NameStyle}>Aadithya H Rao</span>
        </div>

        <div style = {{margin : "10vw", fontSize : "2.4vw", color : "white", textAlign : "left"}}>
            <ul>Modules utilized

                <div style = {{fontSize : "1.4vw"}}><li>axios</li>
                <li>cors</li>
                <li>express</li>
                <li>mongoose</li>
                <li>nodemon</li>
                <li>pure-react-carousel</li>
                <li>react-bootstrap</li>
                <li>react-router-dom</li></div>
            </ul>
       
        </div>

        <div style = {{fontSize : "3vw", margin : "2vw"}}>
        Inspiration
        </div>


        

    </div>
    </>
    )
}



export default About;