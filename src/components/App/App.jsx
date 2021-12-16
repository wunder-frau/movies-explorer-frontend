import { useEffect, useState } from 'react';
import './App.css';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/authApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getMovies } from '../../utils/MoviesApi';
import Search from '../../utils/Search';
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {
  const history = useHistory();

  const { pathname } = useLocation();
  useEffect(() => {
    setIsUpdateSuccessful(false);
    setIsShortFilmChecked(false);
    setIsShortSavedFilmChecked(false);


  }, [pathname]);

  const [isErrorReg, setIsErrorReg] = useState('');
  const [isErrorLogin, setIsErrorLogin] = useState('');
  const [isErrorUserUpdate, setIsErrorUserUpdate] = useState('');
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [isPreloaderLoading, setIsPreloaderLoading] = useState(false);
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [usedKey, setUsedKey] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isFormSent, setIsFormSent] = useState(false);
  const [isRadioChecked, setIsRadioChecked] = useState(false);

  const jwt = localStorage.getItem('jwt');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ? true : false);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(jwt), mainApi.getMovies(jwt)])
        .then(([user, movies]) => {
          setCurrentUser(user.data);
          const userSavedMovies = movies.data.filter((movie) => (movie.owner === user.data._id));
          setSavedMovies(userSavedMovies);
          setSavedMoviesId(userSavedMovies.map((movie) => movie.movieId));
        })
        .catch((e) => console.log(e));
    }
    setIsNotFound(false);
  }, [loggedIn]);

  const [movies, setMovies] = useState(
    localStorage.getItem('movies')
    ? JSON.parse(localStorage.getItem('movies'))
    : []
  );
  useEffect(() => {
    if (movies.length)
      localStorage.setItem('movies', JSON.stringify(movies));
    else
      localStorage.removeItem('movies');
  }, [movies]);

  // ---- /movies

  const [cards, setCards] = useState(localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : []);
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem('savedMovies')
    ? JSON.parse(localStorage.getItem('savedMovies'))
    : []
  );
  useEffect(() => {
    if (savedMovies.length)
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    else
      localStorage.removeItem('savedMovies')
  }, [savedMovies]);

  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('cards'))
      handleSearchShortMovies();
  }, [isShortFilmChecked]);

  // ---- /saved-movies

  const [isShortSavedFilmChecked, setIsShortSavedFilmChecked] = useState(false);
  useEffect(() => {
    if (savedMovies.length || foundSavedMovies.length)
      handleSearchSavedMovies(usedKey);
  }, [isShortSavedFilmChecked]);

  const [foundSavedMovies, setFoundSavedMovies] = useState([]);

  // ---- Account

  const onRegister = (password, email, name) => {
    auth
      .register(password, email, name)
      .then(() => {
        onLogin(password, email);
      })
      .catch((err) => {
        console.log(err);
        setIsErrorReg(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  const onLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsErrorLogin(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  const onSignOut = () => {
    setMovies([]);
    setSavedMovies([]);
    setFoundSavedMovies([]);
    setCurrentUser({ email: '', name: '' });
    localStorage.removeItem('jwt');
    localStorage.removeItem('cards');

    setLoggedIn(false);

    history.push('/');
  };


  const handleUpdateUser = (userInfo) => {
    mainApi
      .patchProfileInfo(userInfo)
      .then((data) => {
        setCurrentUser(data.data);
        setIsUpdateSuccessful(true);
        setProfileError('Ваш профиль успешно обновился!');
      })
      .catch((err) => {
        console.log(err);
        setProfileError('При обновлении профиля произошла ошибка.');
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  // ---- Movies

  const handleSearchMovies = async (searchValue) => {
    setIsErrorSearch(false);
    setIsPreloaderLoading(true);
    setIsNotFound(false);

    try {
      const recievedMovies = (!movies.length) ? await getMovies() : movies;
      setMovies(recievedMovies);

      const foundMovies = Search(recievedMovies, searchValue);
      setCards(foundMovies);
      localStorage.setItem('cards', JSON.stringify(foundMovies));

      handleSearchShortMovies();
    } catch (err) {
      console.error(err);
      setIsErrorSearch(true);
    } finally {
      setIsPreloaderLoading(false);
    }
  };

  const handleSearchShortMovies = () => {
    const shortMoviesCards = JSON.parse(localStorage.getItem('cards')).filter((card) => 
      !isShortFilmChecked || isShortFilmChecked && card.duration < 40
    );
    setCards(shortMoviesCards);
    setIsNotFound(!shortMoviesCards.length);
  };

  const handleSearchSavedMovies = (searchValue) => {
    setIsRadioChecked(!searchValue);
    setUsedKey(searchValue);
    setFoundSavedMovies(Search(savedMovies, searchValue, isShortSavedFilmChecked));
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie.data]);
        setSavedMoviesId([...savedMoviesId, movie.data.id]);
      })
      .catch((err) => { console.error(err); });
  };

  const deleteMovie = (movie) => {
    const movieId = !movie.owner
                    ? savedMovies.find(savedMovie => savedMovie.movieId === String(movie.id))._id
                    : movie._id;

    mainApi
      .removeMovie(movieId)
      .then((c) => {
        setSavedMovies(savedMovies.filter((film) => film._id !== c.data._id));
        setSavedMoviesId(savedMoviesId.filter((id) => id !== c.data.movieId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          onSignOut();
          history.push('/signin');
          console.log(err);
        });
    }

    setSavedMovies(savedMovies);
    setFoundSavedMovies(savedMovies);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
          <ProtectedRoute
            exact
            path='/movies'
            loggedIn={jwt}
            component={Movies}
            movies={cards}
            savedMoviesId={savedMoviesId}
            handleSubmit={handleSearchMovies}
            isLoading={isPreloaderLoading}
            isError={isErrorSearch}
            isNotFound={isNotFound}
            handleSaveMovie={handleSaveMovie}
            deleteMovie={deleteMovie}
            handleChange={setIsShortFilmChecked}
          />
          <ProtectedRoute
            exact
            path='/saved-movies'
            loggedIn={jwt}
            component={SavedMovies}
            movies={
              usedKey || isRadioChecked
                ? foundSavedMovies.length
                  ? foundSavedMovies
                  : 'NotFound'
                : savedMovies
            }
            deleteMovie={deleteMovie}
            handleSubmit={handleSearchSavedMovies}
            handleChange={setIsShortSavedFilmChecked}
          />
          <ProtectedRoute
            path='/profile'
            loggedIn={jwt}
            component={Profile}
            onSignOut={onSignOut}
            handleUpdateUser={handleUpdateUser}
            isError={isErrorUserUpdate}
            setError={setIsErrorUserUpdate}
            isSuccess={isUpdateSuccessful}
            isFormSent={isFormSent}
            setIsFormSent={setIsFormSent}
            setSuccess={setIsUpdateSuccessful}
            profileError={profileError}
            setProfileError={setProfileError}
          />
          <Route exact path='/signin'>
            {!loggedIn ? (
              <Login
                onLogin={onLogin}
                isError={isErrorLogin}
                setError={setIsErrorLogin}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
              />
            ) : (
              <Redirect to='/movies' />
            )}
          </Route>
          <Route path='/signup' exact>
            {!loggedIn ? (
              <Register
                onRegister={onRegister}
                isError={isErrorReg}
                setError={setIsErrorReg}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
              />
            ) : (
              <Redirect to='/movies' />
            )}
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
