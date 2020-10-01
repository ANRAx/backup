/* eslint-disable */
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { hot } from 'react-hot-loader';
import './App.css';

import AddHorrorMovie from './components/AddHorrorMovie';
import HorrorMovie from './components/HorrorMovie';
import HorrorMovieList from './components/HorrorMovieList';

// class App extends Component {
//   render() {
//     return <div className="App"></div>;
//   }
// }

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/horrorMovies" className="navbar-brand">
          What I've Seen
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/add'} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={['/', '/horrorMovies']} component={HorrorMovieList} />
          <Route exact path="/add" component={AddHorrorMovie} />
          <Route path="/horrorMovies/:id" component={HorrorMovie} />
        </Switch>
      </div>
    </div>
  );
}

export default hot(module)(App);
