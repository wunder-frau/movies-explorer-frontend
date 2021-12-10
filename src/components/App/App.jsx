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
  const jwt = localStorage.getItem('jwt');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isErrorReg, setIsErrorReg] = useState('');
  const [isErrorLogin, setIsErrorLogin] = useState('');
  const [isErrorUserUpdate, setIsErrorUserUpdate] = useState('');
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [isPreloaderLoading, setIsPreloaderLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [usedKey, setUsedKey] = useState('');
  const [isFormSent, setIsFormSent] = useState(false);
  const [isShortSavedFilmChecked, setIsShortSavedFilmChecked] = useState(false);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [movies, setMovies] = useState(
    localStorage.getItem('foundMovies')
      ? JSON.parse(localStorage.getItem('foundMovies'))
      : []
  );

  useEffect(() => {
    console.log(localStorage);
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          localStorage.removeItem('foundMovies');
          setMovies([]);
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
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([mainApi.getUserInfo(token), mainApi.getMovies(token)])
        .then(([user, movies]) => {
          setCurrentUser(user.data);
          const userSavedMovies = movies.data.filter((movie) => {
            return movie.owner === user.data._id;
          });
          setSavedMovies(userSavedMovies);
          setSavedMoviesId(movies.data.map((movie) => movie.movieId));
          localStorage.setItem('savedMovies', JSON.stringify(movies.data));
          console.log(movies.data);
          console.log(user.data);
        })
        .catch((e) => console.log(e));
    }
  }, [loggedIn]);

  useEffect(() => {
    setIsNotFound(false);
  }, [loggedIn]);

  useEffect(() => {
    setIsUpdateSuccessful(false);
  }, [pathname]);

  useEffect(() => {
    if (usedKey) {
      handleSearchSavedMovies(usedKey);
    }
  }, [savedMovies]);

  useEffect(() => {
    if (savedMovies.length || foundSavedMovies.length) {
      handleSearchSavedMovies(usedKey);
    }
  }, [isShortSavedFilmChecked]);

  useEffect(() => {
    if (localStorage.getItem('foundMovies')) {
      handleSearchShortMovies();
    }
  }, [isShortFilmChecked]);

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('movies');
    setLoggedIn(false);
    setMovies([]);
    setSavedMovies([]);
    setFoundSavedMovies([]);
    
    setCurrentUser({ email: '', name: '' });
    history.push('/');
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

  const handleUpdateUser = (userInfo) => {
    mainApi
      .patchProfileInfo(userInfo)
      .then((data) => {
        setCurrentUser(data.data);
        setIsUpdateSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsErrorUserUpdate(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  const handleSearchShortMovies = () => {
    const isShort = isShortFilmChecked;
    const cards = JSON.parse(localStorage.getItem('foundMovies'));
    const shortCards = cards.filter((movie) => {
      if (isShort) {
        if (movie.duration < 40) {
          return true;
        }
      } else {
        if (movie.duration >= 40) {
          return true;
        }
      }
    });
    setMovies(shortCards);
    setIsNotFound(!shortCards.length);
  };

  const handleSearchMovies = async (searchValue) => {
    setIsErrorSearch(false);
    setIsPreloaderLoading(true);
    setIsNotFound(false);
    try {
      let movies = JSON.parse(localStorage.getItem('movies'));
      if (!movies) {
        const films = await getMovies();
        localStorage.setItem('movies', JSON.stringify(films));
        movies = JSON.parse(localStorage.getItem('movies'));
      }
      const cards = Search(movies, searchValue);
      localStorage.setItem('foundMovies', JSON.stringify(cards));
      handleSearchShortMovies();
    } catch (err) {
      console.error(err);
      setIsErrorSearch(true);
    } finally {
      setIsPreloaderLoading(false);
    }
  };

  const handleSearchSavedMovies = (searchValue) => {
    setIsRadioChecked(false);
    if (!searchValue) {
      setIsRadioChecked(true);
    }
    setUsedKey(searchValue);
    const movies = Search(
      savedMovies,
      searchValue,
      isShortSavedFilmChecked
    );
    setFoundSavedMovies(movies);
  };

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((movie) => {
        setSavedMoviesId([...savedMoviesId, movie.data.id]);
        setSavedMovies([...savedMovies, movie.data]);
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
            movies={movies}
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
