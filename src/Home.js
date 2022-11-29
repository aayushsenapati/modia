import "./App.css";
import bg from './main-bg.jpg'
import songLogo from './song.svg'
import selectLogo from './select.svg'
import playlistLogo from './playlist.svg'

import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export function Home() {

    const navigate = useNavigate();

    const featureStyle = {
        fontSize: '3vw',
        display: 'inline-block',
        color: 'white',
        width: '30vw',
        margin: '3vw'
    }

    const centerStyle = {
        textAlign: 'center'
    }


    return (


        <>
            <img src={bg} alt="" style={{ width: '100vw', height: 'auto' }} />
            <h1 style={{ fontSize: '25vw', position: 'sticky', bottom: '15vw', color: "#00c524", height: '30vw' }}>Modia.</h1>
            <div style={{ fontSize: '5vw', color: 'white', position: "sticky", top: "10vw", paddingLeft: '5vw' }}>Your mood, Your Style</div><div style={{ height: '500px' }} />

            <div style={{ display: 'flex', justifyContent: 'center', position: 'sticky', top: '18vw' }}>
                <div id="desc" style={featureStyle}>
                    <img src={selectLogo} style={{ height: '18vh', position: "relative", left: '35%' }} />
                    <h2 style={centerStyle}>Easy song selection</h2>
                </div>
                <div id="desc" style={featureStyle}>
                    <img src={songLogo} style={{ height: '18vh', position: "relative", left: '35%' }} />
                    <h2 style={centerStyle}>Access all your playlists at once</h2>
                </div>
                <div id="desc" style={featureStyle}>
                    <img src={playlistLogo} style={{ height: '18vh', position: "relative", left: '35%' }} />
                    <h2 style={centerStyle}>Create playlists based on your mood</h2>
                </div>
            </div>
            <Button variant="outline-success" style={{ position: "sticky", left: "44%", top: "40vw", margin: "5vw", borderRadius: "50px", height: "5vw", width: "12vw" }}
                onClick={() => { navigate('/mood', { replace: true }) }}>Get Started</Button>
            {/* <div style={{height:'2000px'}}/> */}


        </>
    )
}



export default Home;