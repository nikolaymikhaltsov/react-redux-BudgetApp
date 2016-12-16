import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as utils from '../Utils';



export default function budgetReducer(state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.LOAD_BUDGET_SUCCESS: {
      newState.budgetItems = action.budgetItems.map(item => Object.assign({}, item, {prcnt: utils.getPercentFromSalary(item.cost, state.salary)}));
      newState.budgetItems = utils.sortItemsByProperty(newState.budgetItems, state.sortingProperty);
      return newState;
    }

    case types.SAVE_BUDGET_SUCCESS: {
      newState.budgetItems = [...state.budgetItems, Object.assign({}, action.budgetItem)];
      return newState;
    }

    case types.UPDATE_BUDGET_SUCCESS: {
      newState.budgetItems = [...state.budgetItems.filter(budgetItem => budgetItem.id !== action.budgetItem.id), Object.assign({}, action.budgetItem)];
      return newState;
    }

    case types.DELETE_BUDGET_SUCCESS: {
      let items =  [...state.budgetItems.filter(budgetItem => budgetItem.id !== action.budgetItem.id)];
      newState.budgetItems = items;
      return newState;
    }

    case types.SORT_ITEMS: {
      let items = utils.sortItemsByProperty(action.budgetItems, action.sortingProperty);
      newState.budgetItems = items;
      return newState;
    }

    case types.REVERSE_ITEMS: {
      newState.budgetItems = state.budgetItems.slice().reverse();
      return newState;
    }

    case types.UPDATE_SALARY: {
      newState.budgetItems = state.budgetItems.map(item => Object.assign({}, item, {prcnt: utils.getPercentFromSalary(item.cost, action.salary)}));
      return newState;
    }

    default:
      return state;
  }
}
