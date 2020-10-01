import React, { useState, useEffect } from 'react';
import HorrorMovieDataService from '../services/HorrorMovie.service';

const HorrorMovie = (props) => {
  const initialMovieState = {
    id: null,
    title: '',
    description: '',
  };
  const [currentMovie, setCurrentMovie] = useState(initialMovieState);
  const [message, setMessage] = useState('');

  const getMovie = (id) => {
    HorrorMovieDataService.get(id)
      .then((response) => {
        setCurrentMovie(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentMovie({ ...currentMovie, [name]: value });
    console.log(`dasfadfds${initialMovieState}`);
  };

  const updateMovie = () => {
    HorrorMovieDataService.update(currentMovie.id, currentMovie)
      .then((response) => {
        console.log(response.data);
        setMessage('The movie was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteMovie = () => {
    HorrorMovieDataService.remove(currentMovie.id)
      .then((response) => {
        console.log(response.data);
        console.log(currentMovie.id);
        props.history.push('/horrorMovies');
      })
      .catch((err) => {
        console.log('err');
      });
  };

  return (
    <div>
      {currentMovie ? (
        <div className="edit-form">
          <h4>Horror Movie</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentMovie.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentMovie.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteMovie}>
            Delete
          </button>

          <button type="submit" className="badge badge-success" onClick={updateMovie}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Horror Movie...</p>
        </div>
      )}
    </div>
  );
};

export default HorrorMovie;
