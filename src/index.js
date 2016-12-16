import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadBudgetItems} from './actions/budgetActions';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const appStore = configureStore();
const initialSalary = appStore.getState().salary;
const sortingProperty = appStore.getState().sortingProperty;

appStore.dispatch(loadBudgetItems(initialSalary, sortingProperty));

render(
  <Provider store={appStore}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
