import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typewriter from 'typewriter-effect';
import AOS from 'aos'
import { useEffect } from "react";


export default function LandingPage() {


    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, );


    return (
        
            <section className = 'section-one' style = {{marginBottom:'5000px'}} data-aos="fade-up" data-aos-duration="1750">
                <div className="text-center"  style = {{color:"#2C272E", fontFamily:'Poppins'}}>
                    <Row className = 'justify-content-center section-reverse w-100'   >
                        <Col md={6} className='align-items-center align-self-center landing-page-text'>
                            <Typewriter
                            options={{
                                strings: ['Hi There!', 'My name is  Fahad Alaraik', 'I am a junior web developer', 'and a professional idiot👌'],
                                autoStart: true,
                                loop: true,
                                pauseFor:2500,  
                            }}
                            />    
                        </Col>
                        <Col md={3} className='align-items-center align-self-center'>
                            <img src= '../images/wave.gif' style = {{background:'transparent'}} width='276px' height='276px' alt ='wave' />
                        </Col>
                    </Row>
                </div>
            </section>
       
    )




}