import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import BudgetPage from './components/budget/BudgetPage';
import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BudgetPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
