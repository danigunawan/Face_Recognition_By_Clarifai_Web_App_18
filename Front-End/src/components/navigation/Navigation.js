import React from 'react';
import './Navigation.css';

//Komponent streujacy przyciskamy w prawym gornym rogu strony
//W zaleznosci od tego - czy uzytkownym jest zalogowany, wykonuje
//sie jeden z blokow instrukcji warunkowej
//Dzieki atrybutowi onRouteChange, po kliknieciu danego przycisku
//ustawiamy odpowiedni widok.

//Przykladowo: gdy uzytkownik jest zalogowany
//isSignedIn wtedy jest true, wtedy wyswietlamy jeden przycisk Sign out
//i dodajemy do niego zdarzenie, ktory czeka, az klikniemy w ten przycisk,
//a po kliknieciu - za pomoca atrybutu onRouteChange (ktory jest skojrzany)
//z odpowiednia metoda komponentu App - ustawiamy widok strony uzytkownika,
//czyli po kliknieciu na signout - pojawia nam sie ekran logowania
const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn) {
    return (
      <nav className='navigation'>
        <p onClick={() => onRouteChange('signout')}>Sign Out</p>
      </nav>
    );
  } 
  else {
    return (
      <nav className='navigation2'>
        <p onClick={() => onRouteChange('signin')}>Sign In</p>
        <p onClick={() => onRouteChange('register')}>Register</p>
      </nav>
    );
  }
}

export default Navigation;