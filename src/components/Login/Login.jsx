import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

function Login() {
  return (
    <section className='login'>
      <div class='login__container'>
      <Link to='/' className='login__link'>
        <img src={logo} alt='лого' className='login__logo'/>
      </Link>
      <h2 className='login__title'>Рады видеть!</h2>
        <Form
          submitText={{
            buttonText: 'Войти',
            promt: 'Ещё не зарегистрированы?',
            route: '/signup',
            linkText: 'Регистрация',
          }}
          />
      </div>
    </section>
  );
}

export default Login;