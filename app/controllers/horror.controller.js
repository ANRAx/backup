const db = require('../models').default;

const { HorrorMovies } = db;

// Create and Save a new horror movie to db
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content needed to add Horror Movie! Can not be empty!' });
    return;
  }

  // Create a horror movie
  const horrorMovies = new HorrorMovies({
    title: req.body.title,
    description: req.body.description,
  });

  // Save horror movie in the database
  horrorMovies
    .save(horrorMovies)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the movie.',
      });
    });
};

// Retrieve all horror movies from the database.
exports.findAll = (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

  HorrorMovies.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving movie.',
      });
    });
};

// Find a single horror movie with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  HorrorMovies.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Not found with id ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: `Error retrieving horror movie with id=${id}` });
    });
};

// Update a horror movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const { id } = req.params;

  HorrorMovies.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update movie with id=${id}.`,
        });
      } else res.send({ message: 'Movie was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating movie with id=${id}`,
      });
    });
};

// Delete a horror movie with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  HorrorMovies.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete movie with id=${id}. `,
        });
      } else {
        res.send({
          message: 'Movie was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Movie with id=${id}`,
      });
    });
};

// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
  HorrorMovies.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} movies were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all movies.',
      });
    });
};
