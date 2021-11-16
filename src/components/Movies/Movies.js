import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
// import Preloader from '../Preloader/Preloader';
// import SearchForm from '../SearchForm/SearchForm';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function Movies() {
  // const [isFinding, setIsFinding] = React.useState(false)

  return (
    <>
      <Header isLogin />
      {/* <SearchForm />
      {isFinding && <Preloader />}
      {!isFinding && <MoviesCardList isSaved={false} />} */}
      <Footer />
    </>
  )
}