import logo from "./mlogo.png"
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";

const Navigate = (props) =>{
  let navigate = useNavigate();
    return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky = "top">
<Navbar.Brand href="#home">
<img src={logo} alt = "error" style = {{height : "1em", width : "1em", marginRight : "1em", marginLeft : "1em"}}/>
  Modia
</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="/">Select Mood </Nav.Link>
    <Nav.Link onClick={()=>navigate("/playlist")}>Playlist</Nav.Link>
  </Nav>
  <Nav>
    <Nav.Link href="#deets">About</Nav.Link></Nav>
    <Nav className = 'ms-auto'>
    <Button onClick={props.logout} style = {{width : "80px", marginRight : "30px"}}>Logout</Button>
  </Nav>
</Navbar.Collapse>
</Navbar>
    )
};

export default Navigate;