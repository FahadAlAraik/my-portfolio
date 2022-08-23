import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import AOS from 'aos'
import $ from 'jquery';
function NavBar() {

  const [expand,updateExpand] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });


  return (
    
    <Navbar expand="lg"  className = ' m-2 p-3  justify-content-center' style = {{backgroundColor:'#2C272E', borderRadius:'25px'}} id='home' data-aos="fade-down" data-aos-duration="1750">
        
          
          {/* <Navbar.Brand href="#home" style = {{fontFamily: 'Sacramento, cursive', fontSize: '3rem', marginLeft:'25px', color:'#FEF9EF'}}>Fahad AlAraik</Navbar.Brand> */}
          
       
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick = {()=>updateExpand(!expand)}/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          
          <Nav className="justify-content-center align-self-center text-center" >
            
            <Nav.Link href="#home" id = 'navbar-item'>Home</Nav.Link>
            
            <Nav.Link href="#about-me" id = 'navbar-item'>About Me</Nav.Link>
            
            <Nav.Link href="#skills" id = 'navbar-item' >Skills</Nav.Link>
      
            <Nav.Link href="#contact-me" id='navbar-item'>Contact Me</Nav.Link>
          </Nav>
          
            </Navbar.Collapse>
           
            <img src = '../images/programming-language.png' className = 'first-image-style' alt ='html'  />
            <img src = '../images/programming-language.png' className = 'second-image-style' alt= 'html' />
            
    </Navbar>
    
  );
}

export default NavBar;