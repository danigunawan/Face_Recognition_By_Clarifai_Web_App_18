import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import brain from './brain.png';

//Komponent ustawiajacy logo (zdjecie mozgu) na naszej stronie
const Logo = () => {
  return(
    <div className='logo'>
      <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
       <div className="Tilt-inner"> 
        <img alt='logo' src={brain}/>
       </div>
      </Tilt>
    </div>
  );
}

export default Logo;