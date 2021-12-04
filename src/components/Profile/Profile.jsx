import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Validation from '../../hooks/Validation';

function Profile({
  handleSignOut,
  handleUpdateUser,
  isSuccess,
  isError,
  setSuccess,
  setError,
}) {
  const { email, name } = useContext(CurrentUserContext);
  const { values, handleChange } = Validation({
    email,
    name,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(!(values.name === name) || !(values.email === email));
  }, [values.name, values.email, name, email]);

  const onEditSubmit = (evt) => {
    evt.preventDefault();
    setSuccess('');
    setError('');
    const { email, name } = values;
    handleUpdateUser({ email, name });
  };

  return (
    <section className='profile'>
      <div class='profile__container'>
      <h2 className='profile__title'>Привет, {values.name}</h2>
        <form className='profile__form' onSubmit={onEditSubmit}>
          <label className='profile__label' htmlFor='name'>
            Имя
            <input 
              className='profile__input'
              id='name'
              name='name'
              onChange={handleChange}
              value={values.name}
              autoFocus
              autoComplete='off'
              type='text'
              minLength='2'
              maxLength='40'
              required/>
          </label>
          <label className='profile__label' htmlFor='email'>
            Почта
            <input
              placeholder={email}
              type='email'
              className='profile__input'
              id='email'
              name='email'
              onChange={handleChange}
              value={values.email}
              autoComplete='off'
              minLength='2'
              maxLength='40'
              required
            />
          </label>
        </form>
                  {isSuccess ? (
            <span className='profile-error'>
              Ваш профиль успешно обновился!
            </span>
          ) : null}
          {isError ? (
            <span className='profile-error'>
              При обновлении профиля произошла ошибка.
            </span>
          ) : null}
          <button
            className='profile__link profile__link-edit'
            type='submit'
            disabled={!hasChanges}
          >
            Редактировать
          </button>
          <button
            className='profile__link profile__link-signout'
            type='button'
            onClick={handleSignOut}
          >
            Выйти из аккаунта
          </button>
      </div>
    </section>
  );
}

export default Profile;