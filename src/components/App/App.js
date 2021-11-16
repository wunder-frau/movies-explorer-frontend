import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Movies from '../Movies/Movies';
// import Profile from '../Profile/Profile';
// import Login from '../Login/Login';
// import Register from '../Register/Register';
// import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route path='/' exact>
          <Header/>
          {/* <Main/>
          <Footer/> */}
        </Route>
        <Route path='/movies' exact>
          <Header/>
          {/* <Footer/> */}
        </Route>
        {/* <Route path='/saved-movies' exact>
          <Header/>
          <Footer/>
        </Route> */}
        {/* <Route exact path='/profile'>
          <Header/>
        </Route> */}
        {/* <Route exact path='/signin'>
        </Route> */}
        {/* <Route path='/signup' exact>
        </Route> */}
        {/* <Route path='*'>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;

