import React from 'react';
import './MoviesCard.css';
import { HourDuration } from '../../utils/constatns';

const MoviesCard = ({
  movie,
  savedMoviesId,
  isSaved,
  deleteMovie,
  handleSaveMovie,
}) => {
  const handleIsLike = (card, savedCardsId) => {
    if (card.id) {
      return savedCardsId.some((el) => el === card.id);
    }
  };

  let isLiked = handleIsLike(movie, savedMoviesId);
  const cardLikeButtonClassName = `movies-card__like ${
    isLiked ? 'movies-card__like_added' : ''
  }`;
  const hours = Math.trunc(movie.duration / HourDuration);
  const minutes = movie.duration % HourDuration;
  const time = `${hours > 0 ? hours + 'ч ' : ''}${
    minutes > 0 ? minutes + 'м' : ''
  }`;
  const trailer = `${isSaved ? movie.trailer : movie.trailerLink}`;

  function handleSave() {
    if (isSaved) {
      deleteMovie(movie);
    } else {
      if (isLiked) {
        deleteMovie(movie);
      } else {
        handleSaveMovie(movie);
      }
    }
  }

  return (
    <li className='movies-card'>
    <div className='movies-card__wrap'>
    <a
          href={
            trailer.startsWith('https') ? trailer : 'https://www.youtube.com'
          }
          target='_blank'
          rel='noreferrer'
        >
        <img
          className='movies-card__image'
          src={
            ''
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={movie.name}
        />
      </a>
    </div>
    <div className='movies-card__description'>
      <p className='movies-card__name'>{movie.nameRU}</p>
      <p className='movies-card__duration'>{time}</p>
      <button
        className={isSaved ? 'movies-card__like-delete' : cardLikeButtonClassName}
        onClick={handleSave}
/>
    </div>
  </li>
);
}

export default MoviesCard;
