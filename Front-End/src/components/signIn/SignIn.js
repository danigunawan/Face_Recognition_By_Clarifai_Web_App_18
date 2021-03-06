import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    }
  }

//Metoda przechwytujaca to, co wpiszemy w pole Email, ustawia stan komponentu
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

//Metoda przechwytujaca to, co wpiszemy w pole Password, ustawia stan komponentu
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

//Metoda wykonujaca sie po kliknieciu na przycisk Sign In na ekranie logowania uzytkownika
//Metoda ta laczy sie z serwerem, przekazuje zapisany w stanie email i haslo do back-endu,
//ktory sprawdza, czy wprowadzone dane pasuja do danego uzytkownika, jezeli tak - wczytujemy
//za pomoca otrzymanego atrybutu loadUser dane zalogowanego uzytkownika do kompnentu App oraz
//za pomoca drugiego otrzymanego atrybutu onRouteChange - ustawiamy stan route w komponencie
//App na 'home', czyli widok zalogowanego profilu uzytkownika
//Po tym - w komponencie App nastepuje renderowanie odpowiedniego widoku
  onSubmitSignIn = () => {
    fetch('https://blooming-peak-54758.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }

  render() {
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;