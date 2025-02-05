import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './MoviesPage.module.css';

const MoviesPage = ({ API_TOKEN }) => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: { query, language: 'en-US', page: 1, include_adult: false },
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query, API_TOKEN]);

  const handleSearch = event => {
    event.preventDefault();
    const value = event.target.elements.search.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" defaultValue={query} placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: `/movies?query=${query}` }}>
              {movie.title}
            </Link>
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
