import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWI5ZDM5ZjRlNDg1OGNhNDk2NmE5MGU3ZGIzNzFkYyIsIm5iZiI6MTczODc2NjI4NS4xNzgsInN1YiI6IjY3YTM3N2NkYmQ5OWQ2ZTlhNTgxMmQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nY7X8cP8x5oHC8QtZFg4_10Wq81QGTEwK9qgtH7NML8';

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage API_TOKEN={API_TOKEN} />} />
            <Route path="/movies" element={<MoviesPage API_TOKEN={API_TOKEN} />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage API_TOKEN={API_TOKEN} />}>
              <Route path="cast" element={<MovieCast API_TOKEN={API_TOKEN} />} />
              <Route path="reviews" element={<MovieReviews API_TOKEN={API_TOKEN} />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
