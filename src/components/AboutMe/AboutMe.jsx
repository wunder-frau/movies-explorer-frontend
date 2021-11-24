import React from 'react';
import './AboutMe.css';
import avatar from '../../images/profile_img.jpg';

function AboutMe() {
  return (
        <section className='aboutme' id='aboutme'>
          <div className='aboutme__wraper'>
            <div className='aboutme__title-wraper'>
              <h2 className='aboutme__title'>Студент</h2>
            </div>
            <div className='aboutme__elements'>
              <div className='aboutme__text-wraper'>
                <h3 className='aboutme__text-title'>
                  Ирина
                </h3>
                <div className='aboutme__subtitle'>
                  Фронтенд-разработчица, 25 лет
                </div>
                <div className='aboutme__text'>
                  Я живу в Минске, закончил факультет издательского дела БГТУ.
                  Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начала кодить.
                  С 2020 года работаю в типографии. 
                  Решила пойти в Яндекс.Практикум на курс "веб-разработчик", чтобы получить новые навыки в сфере, которая постаянно развивается.
                </div>
                <ul className='aboutme__profiles-list'>
                  <a href='https://www.facebook.com'
                    className='aboutme__profiles-item'
                    rel='noreferrer'
                    target='_blank'>
                    <li>Facebook</li>
                  </a>
                  <a href='https://github.com/wunder-frau'
                    className='aboutme__profiles-item'
                    rel='noreferrer'
                    target='_blank'>
                    <li>Github</li>
                  </a>
                </ul>
              </div>
              <div className='aboutme__image-container'>
                <img className='aboutme__image' src={avatar} alt='фото студента'/>
              </div>
            </div>
          </div>
        </section>
  );
}

export default AboutMe;