import logo from "./mlogo.png"
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

const Navigate = (props) =>{
    return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style = {{position : "sticky", top : "0%", zIndex : "1", width : "100vw"}}>
<Navbar.Brand href="#home">
<img src={logo} alt = "error" style = {{height : "1em", width : "1em", marginRight : "1em", marginLeft : "1em"}}/>
  Modia
</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href = "/hello">Select Mood </Nav.Link>
    <Nav.Link href="/login">Playlist</Nav.Link>
  </Nav>
  <Nav>
    <Nav.Link href="#deets">About</Nav.Link>
    <Button style = {{position : "absolute", left : "90%"}} onClick={props.logout}>Logout</Button>
  </Nav>
</Navbar.Collapse>
</Navbar>
    )
};

export default Navigate;