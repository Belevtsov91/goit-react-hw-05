import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ API_TOKEN }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` }
      });
      setReviews(response.data.results);
    };
    fetchReviews();
  }, [movieId, API_TOKEN]);

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p><strong>{review.author}:</strong> {review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>
    </div>
  );
};

// ✅ Добавляем валидацию пропсов
MovieReviews.propTypes = {
  API_TOKEN: PropTypes.string.isRequired,
};

export default MovieReviews;
