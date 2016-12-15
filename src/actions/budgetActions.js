import BudgetApi from '../api/mockBudgetApi';
import * as types from './actionTypes';
import * as utils from '../Utils';

export function loadBudgetItemsSuccess(budgetItems, salary) {
  return {type: types.LOAD_BUDGET_SUCCESS, budgetItems, salary};
}

export function saveBudgetItemSuccess(budgetItem) {
  return {type: types.SAVE_BUDGET_SUCCESS, budgetItem};
}

export function updateBudgetItemSuccess(budgetItem) {
  return {type: types.UPDATE_BUDGET_SUCCESS, budgetItem};
}

export function deleteBudgetItemSuccess(budgetItem) {
  return {type: types.DELETE_BUDGET_SUCCESS, budgetItem};
}

/**
 *
 * @param salary - salary's initial value used to
 *  calculate item's '% from Salary field' on start of app
 */
export function loadBudgetItems(salary) {
  return dispatch => {
    return BudgetApi.getAllBudgetItems().then(items => {
      dispatch(loadBudgetItemsSuccess(items, salary));
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveBudgetItem(itemToSave, salary){
  itemToSave.prcnt = utils.getPercentFromSalary(itemToSave.cost, salary);
  return dispatch => {
    return BudgetApi.saveBudgetItem(itemToSave).then(savedItem => {
      itemToSave.id ? dispatch(updateBudgetItemSuccess(savedItem)) : dispatch(saveBudgetItemSuccess(savedItem));
    }).catch(error => {
      throw (error);
    });
  };
}

export function deleteBudgetItem(item){
  return dispatch => {
    return BudgetApi.deleteBudgetItem(item).then(deletedItem => {
     dispatch(deleteBudgetItemSuccess(deletedItem));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateSalary(salary) {
  return {
    type: types.UPDATE_SALARY,
    salary
  };
}

export function sortItems(budgetItems, sortingProperty) {
  return { type: types.SORT_ITEMS, budgetItems, sortingProperty };
}

export function reverseItems(budgetItems, sortingProperty) {
  return { type: types.REVERSE_ITEMS, budgetItems, sortingProperty };
}
