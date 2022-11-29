import "./App.css";
import bg from './main-bg.jpg'

export function Home() {
    return(
    <>
    <img src={bg} alt="" style={{width:'100vw',height:'auto'}}/>
    <h1 style={{fontSize:'25vw',position:'sticky',bottom:'15vw', color : "#00c524"}}>Modia.</h1>
    <div style={{fontSize:'5vw', color:'white'}}>Your mood, Your Style</div>
    <div style={{height:'1000px'}}/>

        
    </>
    )
}



export default Home;