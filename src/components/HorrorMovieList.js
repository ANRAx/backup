// import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HorrorMovieDataService from '../services/HorrorMovie.service';

const HorrorMovieList = () => {
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  const onChangeSearchTitle = (e) => {
    const searchNewTitle = e.target.value;
    setSearchTitle(searchNewTitle);
  };

  const retrieveMovie = () => {
    HorrorMovieDataService.getAll()
      .then((response) => {
        setHorrorMovies(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveMovie();
  }, []);

  const refreshList = () => {
    retrieveMovie();
    setCurrentMovie(null);
    setCurrentIndex(-1);
  };

  const setActiveMovie = (movie, index) => {
    setCurrentMovie(movie);
    setCurrentIndex(index);
  };

  const removeAllMovies = () => {
    HorrorMovieDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findByTitle = () => {
    HorrorMovieDataService.findByTitle(searchTitle)
      .then((response) => {
        setHorrorMovies(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 text-center">
        <h4>Horror Movies List</h4>

        <ul className="list-group">
          {horrorMovies &&
            horrorMovies.map((HorrorMovie, index) => (
              <li
                className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setActiveMovie(HorrorMovie, index)}
                key={index}
              >
                {HorrorMovie.title}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllMovies}>
          Delete All
        </button>
      </div>
      <div className="col-md-6">
        {currentMovie ? (
          <div>
            <h4>Movie</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentMovie.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentMovie.description}
            </div>
            <Link to={`/horrorMovies/${currentMovie.id}`} className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Horror Movie...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorrorMovieList;
