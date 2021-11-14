import './Header.css';
import logo from '../../images/logo.svg';
// import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
      <header className='page__header header'>
        <div className='header__wraper'>
        <div className='header__btn-set'>
        <a className='header__link' href='#section' target='_blank'>
          <img src={logo} alt='лого место' className='header__logo' />
        </a>
        </div>
        <div className='header__btn-set'>
        <a className='header__link header__sign-text ' href='#section' target='_blank'>
          Регистрация
        </a>
        <a className='header__link header__btn-signin' href='#section' target='_blank'>
          Войти
        </a>
        </div>
        </div>
      </header>
  );
}

export default Header;