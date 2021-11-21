import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
        <section className='about' id='aboutproject'>
          <div className='about__wraper'>
            <div className='about__title-wraper'>
              <h2 className='about__title'>О проекте</h2>
            </div>
            <div className='about__text-container'>
              <div>
                <h3 className='about__text-title'>
                  Дипломный проект включал 5 этапов
                </h3>
                <div className='about__text'>
                  Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </div>
              </div>
              <div>
                <h3 className='about__text-title'>
                  На выполнение диплома ушло 5 недель
                </h3>
                <div className='about__text'>
                  У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </div>
              </div>
            </div>
            <div className='about__square-wraper'>
              <div className='about__square about__square-green about__square-text about__square-text_black'>
                1 неделя
              </div>
              <div className='about__square about__square-gray about__square-text about__square-text_white'>
                4 недели
              </div>
              <div className='about__square about__square-text about__square-text_gray'>
                Back-end
              </div>
              <div className='about__square about__square-text about__square-text_gray'>
                Front-end
              </div>
            </div>
          </div>
        </section>
  );
}

export default AboutProject;