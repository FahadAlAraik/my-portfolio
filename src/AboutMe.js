import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"



function AboutMe() {

    return (
    
    <section id ='about-me'  className = 'about-me-section' style = {{position:'relative'}}>
        <Container fluid className = 'pt-5'   >
           
           {/* <img className = 'about-me-sticker' src="../images/video-calling.png" /> */}
            
            <Row className = 'section-reverse-updown'>
                <Col className='text-center align-self-center' data-aos="fade-up" data-aos-duration="2250">
                    <img className = 'about-me-img' src='../images/rocket.gif' alt ='programmer' />
                </Col>

                <Col className = 'text-left align-self-center Poppins about-me-text' data-aos="fade-down" data-aos-duration="1750">
                    <h3 className = 'about-me-text-header'>ABOUT ME</h3>
                    <h5 className = 'mt-3 mb-5 about-me-text-subheader'>Fahad Alaraik - Software Engineer</h5>
                    <div className ='mt-5' style={{fontSize:'1.3em'}}>
                        <p>My name is Fahad Abdullah Alaraik, I'm currently a student at King Saud University</p> 
                        <p>majoring in Software Engineering, having good experience with MERN Technologies.</p>
                        <p> currently learning Data Science and Machine learning using pandas and scikit in Python.</p>
                        <p> I'm extremley motivaited and looking to land a part-time full stack developer job </p>
                    </div>
                   

                </Col>
            </Row>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Container>
    </section>
    )



}


export default AboutMe;