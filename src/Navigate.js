import logo from "./mlogo.png"
import defUser from "./defUser.png"
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Navigate = (props) => {
  let navigate = useNavigate();
    return(
        <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" sticky = "top" style={{backgroundColor:'#202020'}}>

          <Navbar.Brand onClick={()=>navigate("/")}>
            <img src={logo} alt = "error" style = {{height : "1em", width : "1em", marginRight : "1em", marginLeft : "1em"}}/>
              Modia
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={()=>navigate("/mood")}>Select Mood </Nav.Link>
              <Nav.Link onClick={()=>navigate("/playlist")}>Playlist</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={()=>navigate("/about")}>About</Nav.Link></Nav>
              <Nav className = 'ms-auto'>
              <img src={props.ud.images.length?props.ud.images[0].url:defUser} alt = "error" style = {{height : "40px", width : "40px", marginRight : "1em", marginLeft : "1em",borderRadius:"50%"}}/>
              <Button onClick={props.logout} style = {{width : "80px", marginRight : "30px"}} variant='outline-success'>Logout</Button>
            </Nav>
          </Navbar.Collapse>
          
        </Navbar>
    )
};

export default Navigate;