import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <div className='search-form'>
      <div className='search-form__container'>
        <form>
          <div className='search-form__wrap'>
            <input placeholder='Фильм' className='search-form__input search-form__text' required />
          </div>
          <FilterCheckbox filterText='Короткометражки'/>
        </form>
        <button type='submit' className='search-form__submit'>Найти</button>
      </div>
    </div>
  );
}

export default SearchForm;