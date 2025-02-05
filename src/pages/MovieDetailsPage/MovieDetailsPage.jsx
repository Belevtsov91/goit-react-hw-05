import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ API_TOKEN }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` }
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [movieId, API_TOKEN]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      {/* Кнопка "Go Back" теперь ведет на главную страницу */}
      <button className={styles.goBack} onClick={() => navigate('/')}>
        ← Go back
      </button>

      <div className={styles.container}>
        {/* Постер фильма */}
        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

        {/* Информация о фильме */}
        <div className={styles.info}>
          <h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <p><strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <div className={styles.genres}>
            {movie.genres.map(genre => <span key={genre.id}>{genre.name}</span>)}
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className={styles.additionalInfo}>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

MovieDetailsPage.propTypes = {
  API_TOKEN: PropTypes.string.isRequired,
};

export default MovieDetailsPage;
