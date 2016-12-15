import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Deprecated. Need some refactoring here (move initialState.defaults and do some changes in BudgetReducer.js)
 */
export default function salaryReducer(state = initialState.defaults, action) {
  switch (action.type) {

    default:
      return state;
  }
}

