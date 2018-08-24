import React from 'react';
import './ImageLinkForm.css';


//Komponent, ktory reaguje na wpisana fraze w input (w widoku profilu uzytkownika)
//oraz klikniecie przycisku Detect
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return(
    <div>
      <p className="rank">
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='input'>
        <input type='text' onChange={onInputChange}/>
        <button onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;