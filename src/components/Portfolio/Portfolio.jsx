import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <div className='portfolio__wraper'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <a href='https://github.com/wunder-frau/how-to-learn' className='portfolio__link' rel='noreferrer' target='_blank'>
            <li className='portfolio__list-element'>
              <div>Статичный сайт</div>
              <div className='portfolio__arrow' alt='стрелка'>↗</div>
            </li>
          </a>
          <a href='https://wunder-frau.github.io/russian-travel' className='portfolio__link' rel='noreferrer' target='_blank'>
            <li className='portfolio__list-element'>
              <div>Адаптивный сайт</div>
              <div className='portfolio__arrow' alt='стрелка'>↗</div>
            </li>
          </a>
          <a href='https://wunder-frau.github.io/mesto' className='portfolio__link' rel='noreferrer' target='_blank'>
            <li className='portfolio__list-element'>
              <div>Одностраничное приложение</div>
              <div className='portfolio__arrow' alt='стрелка'>↗</div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;