import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({name, duration, picture}) {
  const { pathname } = useLocation();
  const [isLiked , setIsLiked] = useState(false)

  const likeButtonHandler = () => {
    setIsLiked(!isLiked)
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__wrap'>
        <img className='movies-card__image' src={picture} alt='женщина и дети'/>
      </div>
      <div className='movies-card__description'>
        <h2 className='movies-card__name'>{name}</h2>
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
