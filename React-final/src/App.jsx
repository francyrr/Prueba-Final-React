import React, { useState, useEffect } from "react";
import { Miapi } from "./components/Miapi";
import Buscador from './components/Buscador';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    let updatedMovies = [...movies];

    if (searchTerm) {
      updatedMovies = updatedMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'asc') {
      updatedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      updatedMovies.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayedMovies(updatedMovies);
  }, [movies, searchTerm, sortOrder]);

  return (
    <>
      <div className="container">
        <h1 className="neon">The most Popular</h1>
        <p className="neon2">Movies of the week Worldwide</p>
        <p className="neon3">
          <span className="flicker1">♣</span>
          <span className="flicker2">♣</span>
          <span className="flicker3">♣</span>
        </p>
      </div>
      <Buscador
        setSearchTerm={setSearchTerm}
        setSortOrder={setSortOrder}
        searchTerm={searchTerm}
        displayedMovies={displayedMovies}
      />
      {displayedMovies && <Miapi setMovies={setMovies} movies={displayedMovies} />}
    </>
  );
}

export default App