import { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Validation from '../../hooks/Validation';

function SearchForm({ handleSubmit, handleChangeRadio, defaultChecked }) {
  const { values, handleChange, errors, isValid } = Validation({key: '',});

  const [searchError, setSearchError] = useState('');

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      setSearchError('');
      handleSubmit(values.key);
    } else if (values.key.length > 0) {
      setSearchError(errors.key);
    } else {
      setSearchError('Нужно ввести ключевое слово');
    }
  }

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__form' onSubmit={handleSearchSubmit}>
          <div className='search-form__wrap'>
            <input placeholder='Фильм'
              className='search-form__input search-form__text'
              value={values.key}
              onChange={handleChange}
              name='key'
              autoComplete='off'
              id='key-input'
              type='text'
              minLength='1'
              maxLength='60'
              required
            />
          </div>
          <span className='searchform__error' id='key-input-error'>
              {searchError}
            </span>
          <FilterCheckbox filterText='Короткометражки' handleChangeRadio={handleChangeRadio} defaultChecked={defaultChecked} />
        </form>
        <button type='submit' onClick={handleSearchSubmit} className='search-form__submit'>Найти</button>
      </div>
    </section>
  );
}
export default SearchForm;