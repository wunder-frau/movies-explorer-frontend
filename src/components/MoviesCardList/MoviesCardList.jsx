import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import picture from '../../images/test-card.png';

function MoviesCardList() {
  return (
    <section className='movies'>
      <p className='movies__not-found'>Ничего не найдено</p>
      <ul className='movies__list'>

          <MoviesCard 
            name='33 слова о дизайне'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Киноальманах «100 лет дизайна»'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='В погоне за Бенкси'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Баския: Взрыв реальности'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Бег это свобода'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Книготорговцы'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Когда я думаю о Германии ночью'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Бег это свобода'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Книготорговцы'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Когда я думаю о Германии ночью'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Книготорговцы'
            duration='1ч 42м'
            picture={picture}
          />
          <MoviesCard
            name='Когда я думаю о Германии ночью'
            duration='1ч 42м'
            picture={picture}
          />
        </ul>
      <button className='movies__button' type='button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;