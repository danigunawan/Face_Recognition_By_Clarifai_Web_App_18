import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({box, imageUrl}) => {
  return(
    <div className='preImage'>
      <div className='image'>
        <img id='inputimage' alt='' src={imageUrl}  width='500px' height='auto'/>
        <div className='bounding-box' 
        style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;