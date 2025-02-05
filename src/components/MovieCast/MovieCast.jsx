import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './MovieCast.module.css';

const MovieCast = ({ API_TOKEN }) => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` }
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };
    fetchCast();
  }, [movieId, API_TOKEN]);

  return (
    <div className={styles.castContainer}>
      <h2>Cast</h2>
      <div className={styles.castGrid}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <div key={actor.id} className={styles.castMember}>
              <img
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/no-image.jpg'}
                alt={actor.name}
                className={styles.actorImage}
              />
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.character}>as {actor.character}</p>
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
};

MovieCast.propTypes = {
  API_TOKEN: PropTypes.string.isRequired,
};

export default MovieCast;
