import './Portfolio.css'

function Portfolio() {
  return (
    <div className='portfolio'>
      <div className='portfolio__wraper'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <a href='/' className='portfolio__link'>
            <li className='portfolio__list-element'>
              <div>Статичный сайт</div>
              <div className='portfolio__arrow'>↗</div>
            </li>
          </a>
          <a href='/' className='portfolio__link'>
            <li className='portfolio__list-element'>
              <div>Адаптивный сайт</div>
              <div className='portfolio__arrow'>↗</div>
            </li>
          </a>
          <a href='/' className='portfolio__link'>
            <li className='portfolio__list-element'>
              <div>Одностраничное приложение</div>
              <div className='portfolio__arrow'>↗</div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;