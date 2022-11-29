import "./App.css";
import bg from './main-bg.jpg'
import desclogo from './gem.svg'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export function Home() {

    const navigate = useNavigate();
    return(
    
        
    <>
    <img src={bg} alt="" style={{width:'100vw',height:'auto'}}/>
    <h1 style={{fontSize:'25vw',position:'sticky',bottom:'15vw', color : "#00c524"}}>Modia.</h1>
    <div style={{fontSize:'5vw', color:'white', position : "sticky", top : "10vw"}}>Your mood, Your Style</div><div style = {{height : '500px'}}/>

    <div style = {{display : "flex", position : "sticky", top : "20vw"}}>
    <div id = "desc" style = {{fontSize : '3vw', display: 'inline-block', color : 'white', margin : "30px"}}>
    <img src = {desclogo} style = {{height : '18vh', position : "relative", left : '35%'}}/>
        <h2>Easy song selection</h2>
    </div>
    <div id = "desc"  style = {{fontSize : '3vw', display: 'inline-block', color : 'white', margin : "30px"}}>
        <img src = {desclogo} style = {{height : '18vh', position : "relative", left : '35%'}}/>
        <h2>Access all your playlists at once</h2>
    </div>
    <div id = "desc"  style = {{fontSize : '3vw', display: 'inline-block', color : 'white', margin : "30px"}}>
    <img src = {desclogo} style = {{height : '18vh', position : "relative", left : '35%'}}/>
        <h2>Create playlists based on your mood</h2>
    </div>
    </div>
    <Button variant = "outline-success" style = {{position : "sticky", left : "44%", top : "40vw", margin : "5vw", borderRadius : "50px", height : "8vh", width : "12vw"}} 
    onClick = {() => {navigate('/mood',  {replace:true})}}>Get Started</Button>
    <div style={{height:'2000px'}}/>

        
    </>
    )
}



export default Home;