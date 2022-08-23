import Container from "react-bootstrap/esm/Container";
import mySkills from "./MySkills";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SkillItem from './SkillItem';
import Card from 'react-bootstrap/Card';
import { useState } from "react";



Object.keys(mySkills).map((key) => {
    Object.keys(mySkills[key]).map((innerKey) => {
        console.log(`${key}: ${innerKey} : ${mySkills[key][innerKey]}`)
    })
    console.log('------------------')
})



function Skills() {

    const [counter,updateCounter] = useState(1);


    return (

        <section className = 'myskills-section Poppins' id ='skills' style = {{position:'relative'}}>
            <Container fluid>

            <Col className ='myskills-header'>
                <h1>{`<%= My Skills %>`}</h1>
            </Col>
            <img src = '../images/creativity.png' className = 'skills-sticker-one' />
            
            {
                Object.keys(mySkills).map((key) => {
                
                return <div data-aos="fade-down" data-aos-duration="2500">
                            <br /> <br />
                            <div className = 'd-flex align-items-center skill-row mt-5 pt-5 mb-5 justify-content-center' >
                                <img className='skill-image' src = {`../images/Skills/${key}.png`} alt = {key} />
                                <h1 className = 'skill-header' style ={{marginLeft:'25px'}}>{key}</h1> 
                            </div>
                            <Row className='justify-content-center'>
                            
                            {Object.keys(mySkills[key]).map((innerKey) => {
                         
                        return <Card className='m-3 '>
                                <Card.Img className='mt-5' variant="top" src={`../images/Skills/${innerKey}.png`} alt = {innerKey} />
                                <Card.Body >
                                    <Card.Title className='text-center bold'>{innerKey}</Card.Title>
                                    <Card.Text className='text-center'>
                                        <div className = 'text-center outer-progress-bar'>
                                            <div className = 'text-center inner-progress-bar bold' style = {{width: `${mySkills[key][innerKey]}%`}}> 
                                                <span>{mySkills[key][innerKey]}%</span>                  
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                    })}
                            </Row>
                       

                    
                    </div>
                        
                    
                })
                
            }

            
                   
                
            
            
            <br /><br /><br /><br /><br /><br /><br /><br />
            </Container>
        </section>


    )



}

export default Skills;