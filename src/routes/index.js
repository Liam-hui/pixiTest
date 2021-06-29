import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from '@/pages/Home'
import Test from '@/pages/Test'

import history from './history';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/test">
        <Test/>
      </Route>
    </Switch>
  </Router>
);

export default Routes
