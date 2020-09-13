import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css'
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/about' component={Register} />
      </Switch>
    </>
  );
}

export default App;