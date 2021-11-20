import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import testCard from '../../images/test-card.png';
import moviesIconCard from '../../images/added-card-icon.svg';
import moviesSavedCardIcon from '../../images/delete-card-icon.svg';
import saveCardIcon from '../../images/save-card-icon.svg';

function MoviesCard({name, duration, picture}) {
  const { pathname } = useLocation();
  const [isLiked , setIsLiked] = useState(false)

  const likeButtonHandler = () => {
    setIsLiked(!isLiked)
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__wrap'>
        <img className='movies-card__image' src={picture} alt='карточка'/>
      </div>
      <div className='movies-card__description'>
        <p className='movies-card__name'>{name}</p>
        <p className='movies-card__duration'>{duration}</p>
        {pathname === '/movies' 
          ? <button className={`movies-card__like ${isLiked ? 'movies-card__like_added' : ''}`} onClick={likeButtonHandler}/>
          : <button className='movies-card__like-delete'/>
        }
      </div>
    </li>
  );
}

export default MoviesCard;
