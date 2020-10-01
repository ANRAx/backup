/* eslint-disable */
import React, { useState } from 'react';
import HorrorMovieDataService from '../services/HorrorMovie.service';

const AddMovie = () => {
  const initialMovieState = {
    id: null,
    title: '',
    description: '',
  };

  const [horrorMovie, setHorrorMovie] = useState(initialMovieState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHorrorMovie({ ...horrorMovie, [name]: value });
  };

  const saveMovie = () => {
    const data = {
      title: horrorMovie.title,
      description: horrorMovie.description,
    };

    HorrorMovieDataService.create(data)
      .then((response) => {
        setHorrorMovie({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newMovie = () => {
    setHorrorMovie(initialMovieState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Boo!</h4>
          <button className="btn btn-success" onClick={newMovie}>
            Add Movie
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={horrorMovie.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={horrorMovie.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveMovie} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddMovie;
