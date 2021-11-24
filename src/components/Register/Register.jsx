import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

function Register() {
  return (
    <section className='register'>
      <div class='register__container'>
      <Link to='/' className='register__link'>
        <img src={logo} alt='лого' className='register__logo'/>
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <label htmlFor='name' className='register__label'>Имя</label>
      <input required id='name' className='register__input' minLength='2' type='text'/>
      <span className='form__input_error'>Текст ошибки</span>
        <Form
          submitText={{
            buttonText: 'Зарегистрироваться',
            promt: 'Уже зарегистрированы?',
            route: '/signin',
            linkText: 'Войти',
          }}
          />
      </div>
    </section>
  );
}

export default Register;