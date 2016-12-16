import BudgetApi from '../api/mockBudgetApi';
import * as types from './actionTypes';
import * as utils from '../Utils';

function loadBudgetItemsSuccess(budgetItems, salary, sortingProperty) {
  return {type: types.LOAD_BUDGET_SUCCESS, budgetItems, salary, sortingProperty};
}

function saveBudgetItemSuccess(budgetItem) {
  return {type: types.SAVE_BUDGET_SUCCESS, budgetItem};
}

function updateBudgetItemSuccess(budgetItem) {
  return {type: types.UPDATE_BUDGET_SUCCESS, budgetItem};
}

function deleteBudgetItemSuccess(budgetItem) {
  return {type: types.DELETE_BUDGET_SUCCESS, budgetItem};
}

export function loadBudgetItems(salary, sortingProperty) {
  return dispatch => {
    return BudgetApi.getAllBudgetItems().then(items => {
      dispatch(loadBudgetItemsSuccess(items, salary, sortingProperty));
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
