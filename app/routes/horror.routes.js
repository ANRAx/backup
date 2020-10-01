// module.exports = (app) => {
//   const horrorMovies = require('../controllers/horror.controller');
//   var router = require('express').Router();

//   router.post('/', horrorMovies.create);
//   router.get('/', horrorMovies.findAll);
//   router.get('/:id', horrorMovies.findOne);
//   router.put('/:id', horrorMovies.update);
//   router.delete('/:id', horrorMovies.delete);
//   router.delete('/', horrorMovies.deleteAll);

//   app.use('/api/horrorMovies', router);
// };

module.exports = (app) => {
  const horrorMovies = require('../controllers/horror.controller');

  const router = require('express').Router();

  // Create a new movie
  router.post('/', horrorMovies.create);

  // Retrieve all movies
  router.get('/', horrorMovies.findAll);

  // Retrieve a single movie with id
  router.get('/:id', horrorMovies.findOne);

  // Update a movie with id
  router.put('/:id', horrorMovies.update);

  // Delete a movie with id
  router.delete('/:id', horrorMovies.delete);

  // delete all movies
  router.delete('/', horrorMovies.deleteAll);

  app.use('/api/horrorMovies', router);
};
