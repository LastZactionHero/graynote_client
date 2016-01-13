import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { IndexRoute } from 'react-router'

import App from './Main';
import Dashboard from './Dashboard';
import Share from './Share';

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="share/:shareAuthKey" component={Share}>
      </Route>
      <Route path="*" component={Dashboard}>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
