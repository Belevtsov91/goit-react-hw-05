import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './HomePage.module.css';

const HomePage = ({ API_TOKEN }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
        headers: { Authorization: `Bearer ${API_TOKEN}` }
      });
      setMovies(response.data.results);
    };
    fetchTrendingMovies();
  }, [API_TOKEN]);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
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

HomePage.propTypes = {
  API_TOKEN: PropTypes.string.isRequired,
};

export default HomePage;
