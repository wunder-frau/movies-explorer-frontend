import { React, useState, useContext, useEffect } from 'react';
import './MoviesCard.css';
import { HourDuration } from '../../utils/constatns';

const MoviesCard = ({
  movie,
  savedMoviesId,
  isSaved,
  deleteMovie,
  handleSaveMovie,
}) => {
  const handleIsLike = (movie, savedCardsId) => {
    if (movie.id) {
      return savedCardsId.some((el) => el === movie.id);
    }
  };

  const [isLiked , setIsLiked] = useState(false)

  let isLike = handleIsLike(movie, savedMoviesId);

  const hours = Math.trunc(movie.duration / HourDuration);
  const minutes = movie.duration % HourDuration;
  const time = `${hours > 0 ? hours + 'ч ' : ''}${
    minutes > 0 ? minutes + 'м' : ''
  }`;
  const trailer = `${isSaved ? movie.trailer : movie.trailerLink}`;


  const cardLikeButtonClassName = ( 
    isLiked ? `movies-card__like movies-card__like_added` : `movies-card__like`
  );

  function handleSave(evt) {
    if (isSaved) {
      deleteMovie(movie);
    } else {
      if (isLike) {
        deleteMovie(movie);
      } else {
        handleSaveMovie(movie);
        handleLikeMovie()
      }
    }

}

  function handleLikeMovie() {
    setIsLiked(!isLiked);
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
            isSaved
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
        {isSaved && (
          <button
            aria-label="delete"
            onClick={handleSave}
            type="button"
            className={'movies-card__like-delete'}
          />
        )}
        {!isSaved && (
          <button
            aria-label="like"
            type="button"
            onClick={handleSave}
            className={cardLikeButtonClassName}
          />
        )}
    </div>
  </li>
);
}

export default MoviesCard;
