import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';

//Dynamiczne tlo strony
const particlesOptions = {
particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

// Glowny komponent
class App extends Component {
 
/*
input i imageUrl - do przechowywania adresu do zdjecia
box - obiekt przechowujacy polozenie wykrytej twarzy
route - to co jest otwarte (strona rejestracji lub logowania lub glowna)
isSignedIn - zawiera informacje o tym, czy zalogowano kogos (potrzebne do sterowania oknem nawigacji)
user - przechowuje informacje o zalogowanym uzytkowniku (jego id, imie, email, liczba klikniec i data dol) 
*/ 
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

//Metoda ustawia przekazane parametry zalogowanego uzytkownika do stanu komponentu
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    });
  }

//Metoda oblicza wspolrzedne polozenia wykrytej twarzy na zdjeciu i zwraca obiekt z wymiarami
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

//Metoda ustawia do stanu komponentu wspolrzedne wykrytej twarzy na zdjeciu
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

//Metoda reagujaca na zmiany, zostanie przekazana do innych komponentow
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

//Metoda wykonujaca sie po nacisnieciu przycisku do rozpoznania twarzy
//Zostanie przekazana do innego komponentu (faceRecognition)
//Po wcisnieciu przycisku - funkcja przy pomocy id, laczy sie z serwerem
//ktory zwieksza liczbe klinkiec dla danego uzytkownika w bazie danych
//Metoda wylicza takze wspolrzedne rozpoznanej twarzy oraz ustawia do
//stanu komponentu wspolrzedne wykrytej twarzy na zdjeciu
  onButtonSubmit = () => {
 //Ustawia imageUrl na to co jest w input po kliknieciu przycisku
 //Laczy sie z serwerem - po to, aby uzyskac autoryzacje API
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
      })
    })
    .then(response => response.json())
    .then(response => {
//Przy pomocy id uzytkownika, aktualizuje w bazie danych liczbe klikniec
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
        .catch(err => console.log)
      }
//Ustawia wspolrzedne rozpoznanej twarzy na zdjeciu
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

//Metoda ustawiajaca widok strony
//Gdy klikniemy przycisk signout - czysicmy dane
//Gdy klikniemy przycisk home - ustawiamy odpowiednio przyciski nawigacji
//poprzed komponent isSignedIn i widok profilu uzytkownika
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
      this.setState({input: ''});
      this.setState({imageUrl: ''});
    }
    else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

//Wczytanie widoku w zaleznosci od tego, co jest w stanie kompenentu w atrybucie route:
//Home - widok profilu uzytkownika
//SignIn - ekran logowania (gdy w route jest signout - domyslnie ustawiamy widok na ekran logowania)
//W pozostalych przypadkach - ekran rejestracji nowego uzytkownika
  renderElements() {
    if(this.state.route === 'home') 
    {
      return(
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div>
       );
    }

    else if(this.state.route === 'signin' || this.state.route === 'signout')
      return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;

    else
      return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
  }

//Renderowania widoku - zawsze wczytujemy tlo (Particles) oraz Nawigacje (Przyciski z prawej strony na gorze,
//ktorych widok zalezy od tego, czy jestesmy zalogowani czy nie) oraz w zaleznosci od tego, co jest w stanie komonentu
//w route - widok pozostalych elementow (tutaj wykonuje sie metoda renderElements(), ktora jest przedstawiona wyzej)
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.renderElements()}
      </div>
    );
  }
}

export default App;
