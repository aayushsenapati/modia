
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigate = () =>{
    return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<Navbar.Brand href="#home">
        {/* Add modia logo here
        
        <Logo
          alt=""
          width="30"
          height="30"
          className="d-inline-block align-top"
        /> */}
  Modia
</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="#features">Select Mood</Nav.Link>
    <Nav.Link href="#pricing">Playlist</Nav.Link>
  </Nav>
  <Nav>
    <Nav.Link href="#deets">About</Nav.Link>
  </Nav>
</Navbar.Collapse>
</Navbar>
    )
};

export default Navigate;