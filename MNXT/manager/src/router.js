import React from 'react';
import Home from './views/Home'
import {Router, Route, Switch,Redirect} from 'dva/router';

import Login from './views/login/login';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/home' component={Home}/>
        <Route path="/login" component={Login} />
        <Redirect from="/" to='/home'></Redirect>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
