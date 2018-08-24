const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ea12c3199c1641a5a9ab44dae61e3b85'
});

// Wykorzystanie API Clarifai do rozpoznawania twarzy, 
// wygenerowanie odpowiedzi do front-endu
const handleApiCall = (req, res) => {
  app.models.predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'));
}

//Zwiększenie ilości wczytanych zdjęć dla danego użytkownika
//po wcisnięciu przycisku 'Detect' w profilu użytkownika
const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
}