import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './Navbar';
import LandingPage from './LandingPage';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';

import "aos/dist/aos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div className = 'top-container pt-2'>
        <NavBar />
        <LandingPage />
      </div>
      <AboutMe />
      <Skills />
      <Contact />
      <Footer />
      
    {/* <div className = 'd-flex align-items-center align-self-center' style = {{backgroundColor:'#FCE2DB',paddingTop:'350px'}} > */}
      
    {/* </div> */}
      
  </React.StrictMode>
);


