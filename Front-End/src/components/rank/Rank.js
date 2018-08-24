import React from 'react';
import './Rank.css';

//Prosty komponent, ktory odpowiedzialny jest za wyswietlenie odpowiedniego
//imienia zalogowanego uzytkownika (ktore pobiera za pomoca atrybutu name z komponentu App)
//oraz aktualnej liczby jego klikniec, ktora rowniez pobiera za pom. atryb. z komponentu App
const Rank = ({name, entries}) => {
  return(
    <div>
      <div className="who">
        {`${name}, your current entry count is...`}
      </div>
      <div className="number">
        {entries}
      </div>
    </div>
  );
}

export default Rank;