import './Promo.css'
import logo from '../../images/practicum_logo.svg';

function Promo() {
  return (
        <div className='promo'>
        <img src={logo} alt='лого место' className='promo__logo'/>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
        </div>
  );
}

export default Promo;