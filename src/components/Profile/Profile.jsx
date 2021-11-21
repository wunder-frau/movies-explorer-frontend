import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <div class='profile__container'>
      <h2 className='profile__title'>Привет, Юлия!</h2>
        <form className='profile__form'>
          <label className='profile__label'>
            Имя
            <input className='profile__input' id='name' placeholder='Юлия'></input>
          </label>
          <label className='profile__label'>
            E-mail
            <input className='profile__input' id='email' placeholder='pochta@yandex.ru'></input>
          </label>
        </form>
        <button className='profile__link profile__link-edit' tupe='submit'>
          <p>Редактировать</p>
        </button>
        <button className='profile__link profile__link-signout' tupe='button'>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;