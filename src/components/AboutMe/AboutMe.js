import './AboutMe.css'

function AboutMe() {
  return (
        <div className='aboutme'>
          <div className='aboutme__wraper'>
            <div className='aboutme__title-wraper'>
              <h2 className='aboutme__title'>Студент</h2>
            </div>
            <div className='aboutme__text-container'>
              <div>
                <h3 className='aboutme__text-title'>
                  Ирина
                </h3>
                <div className='aboutme__subtitle'>
                  Фронтенд-разработчица, 25 лет
                </div>
                <div className='aboutme__text'>
                  Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                  и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                  С 2015 года работал в компании «СКБ Контур». 
                  После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </div>
                <ul className='aboutme__profiles-list'>
                <a href='/' className='aboutme__profiles-item'>
                  <li>Facebook</li>
                </a>
                <a href='/' className='aboutme__profiles-item'>
                  <li className='aboutme__profiles-item'>Github</li>
                </a>
              </ul>
              </div>
              <div className='aboutme__image-container'>
                <div className='aboutme__image'></div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default AboutMe;