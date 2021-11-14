import './Techs.css'

function Techs() {
  return (
        <div className='techs'>
          <div className='techs__wraper'>
            <div className='techs__title-wraper'>
              <h2 className='techs__title'>Технологии</h2>
            </div>
            <div className='techs__text-container'>
              <h3 className='techs__text-title'>
                7 технологий
              </h3>
              <div className='techs__text'>
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
              </div>
              <ul className='techs__icon-wrapper'>
                <li className='techs__icon'>HTML</li>
                <li className='techs__icon'>CSS</li>
                <li className='techs__icon'>JS</li>
                <li className='techs__icon'>React</li>
                <li className='techs__icon'>Git</li>
                <li className='techs__icon'>Express.js</li>
                <li className='techs__icon'>MongoDB</li>
              </ul>
            </div>
          </div>
        </div>
  );
}

export default Techs;