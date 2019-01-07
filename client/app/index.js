import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/Views/NotFound';

import Home from './components/Views/Home';
import Login from './components/Views/Login';
import Register  from "./components/Views/Register";

import './styles/styles.scss';
console.disableYellowBox = true;
console.disableRedBox = true;
render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
