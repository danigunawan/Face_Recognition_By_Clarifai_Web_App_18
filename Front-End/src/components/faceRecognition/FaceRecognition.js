import React from 'react';
import './FaceRecognition.css';

//Komponent odpowiedzialny za wystwietlenie zdjecia oraz zaznaczenie na nim rozpoznanej twarzy
//Uzywam tu pozycji absolutnej (w pliku .css o tej samej nazwie) div bounding-box względem div image
//Atrybut box zawiera wspolrzedne rozpoznanej twarzy a imageUrl - adres do zdjecia
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