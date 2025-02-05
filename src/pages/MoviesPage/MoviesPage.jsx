import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './MoviesPage.module.css';

const MoviesPage = ({ API_TOKEN }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    setMovies(response.data.results);
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

MoviesPage.propTypes = {
  API_TOKEN: PropTypes.string.isRequired,
};

export default MoviesPage;
