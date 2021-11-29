import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/authApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const jwt = localStorage.getItem("jwt");
  const [isRegisterError, setIsRegisterError] = useState("");
  const [isLoginError, setIsLoginError] = useState("");
  const [isProfileUpdateError, setIsProfileUpdateError] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isFormSent, setIsFormSent] = useState(false);

  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
          }
        })
        .catch((e) => {
          history.push("/signin");
          console.log(e);
        });
    }
  }, []);


  const onLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoginError(err);
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
        setIsRegisterError(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
    <Header loggedIn={loggedIn}/>
      <Switch>
        <Route path='/' exact>
          <Main/>
        </Route>
        <Route 
            exact
            path="/movies"
            loggedIn={jwt}
            component={Movies}
        >
        </Route>
        <Route path='/saved-movies' exact>
          <Movies/>
          <Footer />
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route exact path="/signin">
            {!loggedIn ? (
              <Login
                onLogin={onLogin}
                isError={isLoginError}
                setError={setIsLoginError}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
          <Route path="/signup" exact>
            {!loggedIn ? (
              <Register
                onRegister={onRegister}
                isError={isRegisterError}
                setError={setIsRegisterError}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

