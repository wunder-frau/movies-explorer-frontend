import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation'

function Header() {
  const { pathname } = useLocation();

  const [burgerMenu, setBurgerMenu] = React.useState(false);

  function handleBurgerMenu() {
    setBurgerMenu(!burgerMenu);
  }
  
  return (
      <header className={pathname === '/' ? 'header' : 'header header_black'}>
        <div className='header__wraper'>
          <Link to='/' className='header__link'>
            <img src={logo} alt='лого' className='header__logo'/>
          </Link>
          <nav className='header__btn-set'>
            {pathname === '/' ? '' : <Navigation />}
          </nav>
          {pathname === '/' ? (
            <ul className='header__btn-set'>
              <li>
                <NavLink to='/signup' className='header__link header__signup-text' target='_blank'>
                  Регистрация
                </NavLink>
              </li>
              <li>
                <NavLink to='/signin' className='header__link header__btn-signin' target='_blank'>
                  Войти
                </NavLink>
              </li>
            </ul>
          ) : (
            <Link to='/profile' className='header__btn-account header__btn-account_none'>Аккаунт</Link>
          )}

        {pathname === '/' ? (
          ''
        ) : (
          <>
            <div
              className={`header__burger ${burgerMenu ? 'header__burger-menu_cross' : ''}`}
              onClick={handleBurgerMenu}
            >
              <div className={`header__burger-menu-line ${burgerMenu ? 'header__btn-account_none' : ''}`} />
              <div className={`header__burger-menu-line ${burgerMenu ? 'header__btn-account_none' : ''}`} />
              <div className={`header__burger-menu-line ${burgerMenu ? 'header__btn-account_none' : ''}`} />
            </div>
            <div
              className={`header__burger-menu-container ${burgerMenu ? 'header__burger-menu-container_visible' : ''}`}
              onClick={handleBurgerMenu}
            >
              <nav className='header__burger-menu'>
                <ul className='header__burger-list'>
                  <li className='header__burger-item'>
                    <Link className='header__burger-link' to='/'>
                      Главная
                    </Link>
                  </li>
                  <li className='header__burger-item'>
                    <Link className='header__burger-link' to='/movies'>
                      Фильмы
                    </Link>
                  </li>
                  <li className='header__burger-item'>
                    <Link className='header__burger-link' to='/saved-movies'>
                      Сохранённые фильмы
                    </Link>
                  </li>
                </ul>
              </nav>
              <div
                className={`header__wrapper header__wrapper_burger-menu ${
                  pathname === '/' ? 'header__wrapper_burger' : ''
                }`}
              >
                <Link className='header__signup-text' to={`${pathname === '/' ? '/signup' : '/profile'}`}></Link>
                {pathname === '/' ? (<Link to='/signin' className='header__btn-signin' type='button'>Войти</Link>
                  ) : (
                  <Link to='/profile' className='header__btn-account' type='button'>Аккаунт</Link>
                )}
              </div>
            </div>
          </>
        )}
        </div>
      </header>
  );
}

export default Header;
