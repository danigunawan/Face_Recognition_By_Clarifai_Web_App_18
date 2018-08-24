/* Funkcja rejestrująca użytkownika do bazy danych
Zawiera walidacje danych - odrzuca rejestracje, gdy puste pola
Wykonywana jest transakcja bazodanowa - dodanie albo do dwoch tabel albo do zadnej,
czyli wszystko albo nic
*/
const handleRegister = (req, res, db, bcrypt) => {
  const {name, email, password} = req.body;
  if(name.length === 0 || email.length === 0 || password.length === 0)
    return res.status(400).json('incorrect form submission');
 
  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx('login')
    .insert({
      hash: hash,
      email: email
    })
    .returning('email')
    .then(loginEmail => {
       return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister,
}