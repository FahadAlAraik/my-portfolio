import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTextArea,
  MDBFooter
} from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// <MDBInput id='form3Example1' label='First name' />
// <MDBIcon fab icon='facebook-f' />
export default function Contact() {
  return (
    <section className ='contact-section' id='contact-me' >
        <h1 className='Poppins contact-section-header'>Get in touch</h1>
        <br /><br />

        <Container fluid className='contact-me-container ' >

       

       
        
             <Row className = 'contact-form-img'>

                <Col  className='text-center justify-content-center text-center' style ={{paddingTop:'12rem'}} data-aos="fade-down" data-aos-duration="3000">
                  <img className='contact-sticker' src = '../images/chatting.png' alt ='chatting image' />
                  <br />
                  
                 

                      <Row className='d-flex justify-content-center mt-2 pt-2'  >
                          
                          <Col className='d-flex justify-content-center'>
                              <MDBBtn
                              floating
                              className='m-1'
                              style={{ backgroundColor: '#55acee' }}
                              href='https://www.twitter.com/@fahad_alaraik'
                              role='button'>
                              <MDBIcon fab icon='twitter' /></MDBBtn> 
                              <p className='Poppins p-2' style ={{fontSize:'1.25rem',fontWeight:'bold',marginRight:'50px'}}>@fahad_alaraik</p>
                          </Col>

                          <Col className='d-flex justify-content-center'>
                              <MDBBtn
                              floating
                              className='m-1'
                              style={{ backgroundColor: '#dd4b39' }}
                              href='mailto:falaraik@gmail.com'
                              role='button'>
                              <MDBIcon fab icon='google' /></MDBBtn> 
                              <p className='Poppins p-2' style ={{fontSize:'1.25rem',fontWeight:'bold',marginRight:'50px'}}>falaraik@gmail.com</p>
                          </Col>

                          <Col className='d-flex justify-content-center'>
                              <MDBBtn
                              floating
                              className='m-1'
                              style={{ backgroundColor: '#333333' }}
                              href='https://github.com/FahadAlAraik'
                              role='button'>
                              <MDBIcon fab icon='github' /></MDBBtn> 
                              <p className='Poppins p-2' style ={{fontSize:'1.25rem',fontWeight:'bold',marginRight:'50px'}}>FahadAlAraik</p>
                          </Col>
                      </Row>


                    
               
                
                </Col>
                <br /><br />

                <Col data-aos="fade-up" data-aos-duration="3000" >

                  <Form className='m-auto text-center'action="https://formsubmit.co/falaraik.dev@gmail.com" method="POST" >
                    
                    <h1 className='form-header'>Contact Me</h1>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className = 'm-auto form-input' name='First-Name' type="text"  style={{width:'90%', borderRadius:'15px',padding:'10px 0 10px 15px'}} required />
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className = 'm-auto form-input' name='Last-Name' type="text"  style={{width:'90%',borderRadius:'15px',padding:'10px 0 10px 15px'}} required />
                      </Form.Group>
                    
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className = 'm-auto form-input' name='Email' type="email"  style={{width:'90%',borderRadius:'15px',padding:'10px 0 10px 15px'}}  required/>
                      </Form.Group>

                      <Form.Group className="mb-3 m-auto">
                        <Form.Label>What's on your mind ? </Form.Label>
                        <Form.Control className = 'm-auto form-input' name='textarea' as="textarea" rows={5} placeholder='' style={{width:'90%',margin:'auto',borderRadius:'15px'}} required />
                      </Form.Group>

                  <br />
                  <Button variant="dark" type="submit" style={{fontFamily:'Poppins',fontWeight:'bold',fontSize:'1.25rem',fontSpacing:'1px'}}>
                    Submit
                  </Button>

              </Form>
                
                </Col>

                


             </Row>

      





       
          

          

        </Container>
    </section>
   
  );
}