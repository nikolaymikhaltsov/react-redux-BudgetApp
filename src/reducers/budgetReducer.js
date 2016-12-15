import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as utils from '../Utils';



export default function budgetReducer(state = initialState.budgetItems, action) {
  switch (action.type) {

    case types.LOAD_BUDGET_SUCCESS:
      return action.budgetItems
          .map(item => Object.assign({}, item, {prcnt: utils.getPercentFromSalary(item.cost, action.salary)}));

    case types.SAVE_BUDGET_SUCCESS:
      return [
      ...state, Object.assign({}, action.budgetItem)
      ];

    case types.UPDATE_BUDGET_SUCCESS:
      return [
        ...state.filter(budgetItem => budgetItem.id !== action.budgetItem.id), Object.assign({}, action.budgetItem)
      ];

    case types.DELETE_BUDGET_SUCCESS:
      return [
        ...state.filter(budgetItem => budgetItem.id !== action.budgetItem.id)
      ];

    case types.UPDATE_SALARY:
      return state.map(item => Object.assign({}, item, {prcnt: utils.getPercentFromSalary(item.cost, action.salary)}));

    case types.SORT_ITEMS:
          return utils.sortItemsByProperty(action.budgetItems, action.sortingProperty);

    case types.REVERSE_ITEMS:
      return [...action.budgetItems].reverse();


    default:
      return state;
  }
}

