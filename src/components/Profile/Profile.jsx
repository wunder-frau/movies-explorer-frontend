import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Validation from '../../hooks/Validation';

function Profile({
  onSignOut,
  handleUpdateUser,
  isSuccess,
  isError,
  setSuccess,
  setError,
  isFormSent,
}) {
  const { name, email } = useContext(CurrentUserContext);
  const { values, handleChange, isValid } = Validation({
    name, email
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(values.name === name || values.email === email);
  }, [values.name, values.email, name, email]);

  const onEditSubmit = (evt) => {

    setSuccess('');
    setError('');
    const { name, email } = values;
    handleUpdateUser({ name, email });
    evt.target.reset()
  };



  return (
    <section className='profile'>
      <div class='profile__container'>
      <h2 className='profile__title'>Привет, {name}!</h2>
        <form className='profile__form' onSubmit={onEditSubmit}>
          <label className='profile__label' htmlFor='name'>
            Имя
            <input 
              placeholder={name}
              className="profile__input"
              id="name"
              name="name"
              onChange={handleChange}
              value={values.name}
              autoFocus
              autoComplete="off"
              type="text"
              minLength="2"
              maxLength="40"
              required/>
          </label>
          <label className='profile__label' htmlFor='email'>
            Почта
            <input
              placeholder={email}
              type="email"
              className="profile__input"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              autoComplete="off"
              minLength="2"
              maxLength="40"
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              required
            />
          </label>

          {isSuccess ? (
              <span className="profile__error">
                Ваш профиль успешно обновился!
              </span>
            ) : null}
            {isError ? (
              <span className="profile__error">
                При обновлении профиля произошла ошибка.
              </span>
            ) : null}

        <button
        className={`profile__link ${isValid && !isFormSent ? 'profile__link-edit' : 'profile__link-disabled'}`}
        type={isValid && !isFormSent ? 'submit' : 'button'} disabled={!hasChanges}>

              Редактировать
            </button>
            <button
              className="profile__link profile__link-signout"
              type="button"
              onClick={onSignOut}
            >
              Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;