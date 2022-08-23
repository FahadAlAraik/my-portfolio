import { MDBFooter } from 'mdb-react-ui-kit';
import { useState } from 'react';


export default function Footer() {

    const [currentDate,updateDate] = useState(new Date())

return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#45637d' }}>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
       
        <a className='text-white Poppins' href='#home' style={{fontSize:'1.5rem',letterSpacing:'2px',textTransform:'uppercase'}}>
        © {currentDate.getFullYear()}   - developed using Reactjs
        </a>
    </div>
    </MDBFooter>

)
};